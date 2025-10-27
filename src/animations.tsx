// Centralized animation functions. Each function should accept the target element and the shared options.

export type AnimOptions = {
	duration: number; // ms
	easing: string;
	iterations: number;
	intensity: number; // 0..200 (percent / degrees scaling factor depending on animation)
};

// Helper: ensure SVG has transform-origin centered
function ensureTransformOrigin(el: Element) {
	if (el instanceof HTMLElement) {
		el.style.transformOrigin = "50% 50%";
	} else if (el instanceof SVGElement) {
		(el as any).style.transformOrigin = "50% 50%";
		(el as any).style.transformBox = "fill-box";
	}
}
export function rotate360(el: Element, options: AnimOptions) {
	ensureTransformOrigin(el);
	const keyframes = [
		{ transform: "rotate(0deg)" },
		{ transform: "rotate(360deg)" },
	];
	return (el as any).animate(keyframes, {
		duration: options.duration,
		easing: options.easing,
		iterations: options.iterations || 1,
	});
}

export function pop(el: Element, options: AnimOptions) {
	ensureTransformOrigin(el);
	// intensity controls max scale percent, e.g. 120% -> intensity=120
	const maxScale = Math.max(100, options.intensity);
	const keyframes = [
		{ transform: "scale(0)" },
		{ transform: `scale(${maxScale / 100})` },
		{ transform: "scale(1)" },
	];
	return (el as any).animate(keyframes, {
		duration: options.duration,
		easing: options.easing,
		iterations: options.iterations || 1,
	});
}

export function shake(el: Element, options: AnimOptions) {
	ensureTransformOrigin(el);
	const deg = Math.max(5, Math.min(60, options.intensity)); // clamp
	const keyframes = [
		{ transform: "rotate(0deg)" },
		{ transform: `rotate(${deg}deg)` },
		{ transform: `rotate(${-deg}deg)` },
		{ transform: `rotate(${deg}deg)` },
		{ transform: "rotate(0deg)" },
	];
	return (el as any).animate(keyframes, {
		duration: options.duration,
		easing: options.easing,
		iterations: options.iterations || 1,
	});
}

export function squash(el: Element, options: AnimOptions) {
	ensureTransformOrigin(el);
	// vertical to 10% of height -> scaleY 0.1; width increases to 120% -> scaleX 1.2
	const minY = Math.max(0.05, Math.min(1, (options.intensity || 10) / 100));
	const maxX = Math.max(1, (options.intensity || 120) / 100);
	const keyframes = [
		{ transform: "scale(1,1)" },
		{ transform: `scale(${maxX}, ${minY})` },
		{ transform: "scale(1,1)" },
	];
	return (el as any).animate(keyframes, {
		duration: options.duration,
		easing: options.easing,
		iterations: options.iterations || 1,
	});
}

// Export a registry so the UI can list available animations and the dev can add new ones easily.
export const animations = {
	Поворот: rotate360,
	Всплытие: pop,
	Трясение: shake,
	Сжатие: squash,
} as const;

export type AnimName = keyof typeof animations;
