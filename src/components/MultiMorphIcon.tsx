import React, { useEffect, useRef, useState } from "react";
import * as flubber from "flubber";

/**
 * MultiMorphIcon — компонент для анимации иконок с множеством состояний.
 * Использует пошаговый interpolate() для безопасного морфинга.
 */

type MultiMorphIconProps = {
	paths: string[]; // массив path-ов SVG
	size?: number;
	durationMs?: number; // длительность перехода между состояниями
	loop?: boolean;
};

export const MultiMorphIcon: React.FC<MultiMorphIconProps> = ({
	paths,
	size = 24,
	durationMs = 700,
	loop = true,
}) => {
	const pathRef = useRef<SVGPathElement | null>(null);
	const raf = useRef<number | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!paths || paths.length < 2) return;
		const node = pathRef.current;
		if (!node) return;

		const animateStep = (fromIdx: number) => {
			const toIdx = (fromIdx + 1) % paths.length;
			const interp = flubber.interpolate(paths[fromIdx], paths[toIdx]);
			let start: number | null = null;

			const step = (t: number) => {
				if (start === null) start = t;
				const progress = Math.min(1, (t - start) / durationMs);
				node.setAttribute("d", interp(progress));

				if (progress < 1) {
					raf.current = requestAnimationFrame(step);
				} else {
					// следующий переход
					const nextIdx = toIdx;
					setCurrentIndex(nextIdx);
					if (loop || nextIdx < paths.length - 1) {
						setTimeout(() => animateStep(nextIdx), 100);
					}
				}
			};

			raf.current = requestAnimationFrame(step);
		};

		animateStep(currentIndex);

		return () => {
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, [paths, durationMs, loop]);

	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path ref={pathRef} d={paths[0]} fill="currentColor" />
		</svg>
	);
};

/** Пример использования:
<MultiMorphIcon
  paths={[
    "M12 3L2 12h3v8h6v-6h2v6h6v-8h3z",
    "M12 4L4 11h4v7h4v-5h0v5h4v-7h4z",
    "M12 5L3 12h5v7h4v-4h0v4h4v-7h5z",
    "M12 6L5 13h6v6h2v-6h6z",
  ]}
  durationMs={400}
  loop
/>
*/
