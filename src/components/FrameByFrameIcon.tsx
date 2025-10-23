import React, { useEffect, useRef, useState } from "react";

export type FrameByFrameProps = {
	framesCount?: number;
	size?: number;
	fps?: number;
	className?: string;
	id?: string;
};

export const FrameByFrameIcon: React.FC<FrameByFrameProps> = ({
	framesCount = 6,
	size = 24,
	fps = 12,
	className,
	id,
}) => {
	const [frame, setFrame] = useState(0);
	const rafRef = useRef<number | null>(null);
	const lastRef = useRef<number | null>(null);
	const period = 1000 / fps;

	useEffect(() => {
		const loop = (t: number) => {
			if (lastRef.current === null) lastRef.current = t;
			const elapsed = t - lastRef.current;
			if (elapsed >= period) {
				setFrame((f) => (f + 1) % framesCount);
				lastRef.current = t;
			}
			rafRef.current = requestAnimationFrame(loop);
		};
		rafRef.current = requestAnimationFrame(loop);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [framesCount, period]);

	// Заглушки: мы рисуем простой прямоугольник с номером кадра
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			className={className}
			aria-hidden
			data-frame={frame}
		>
			<rect
				x="0"
				y="0"
				width="24"
				height="24"
				fill="none"
				stroke="currentColor"
				strokeWidth={1}
			/>
			<text
				x="12"
				y="14"
				textAnchor="middle"
				fontSize="8"
				fill="currentColor"
			>
				{frame + 1}
			</text>
		</svg>
	);
};
