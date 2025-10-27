import React from "react";
import type { AnimName } from "../animations";

type Props = {
	animationList: string[];
	selectedAnim: string;
	onChangeAnim: (name: string) => void;
	duration: number;
	onDuration: (v: number) => void;
	intensity: number;
	onIntensity: (v: number) => void;
	iterations: number;
	onIterations: (v: number) => void;
	easing: string;
	onEasing: (v: string) => void;
	onPlay: () => void;
};

export default function Controls({
	selectedAnim,
	animationList,
	onChangeAnim,
	iterations,
	intensity,
	onIterations,
	onIntensity,
	duration,
	onDuration,
	easing,
	onEasing,
	onPlay,
}: Props) {
	return (
		<div className="p-4 border rounded-lg space-y-4">
			<div>
				<label className="block text-sm font-medium">Анимация</label>
				<select
					value={selectedAnim}
					onChange={(e) => onChangeAnim(e.target.value)}
					className="mt-1 block w-full p-2 rounded"
				>
					{animationList.map((a) => (
						<option key={a} value={a}>
							{a}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm">
					Длительность: {duration} ms
				</label>
				<input
					type="range"
					min={100}
					max={5000}
					value={duration}
					onChange={(e) => onDuration(+e.target.value)}
				/>
			</div>

			<div>
				<label className="block text-sm">
					Интенсивность: {intensity}
				</label>
				<input
					type="range"
					min={5}
					max={200}
					value={intensity}
					onChange={(e) => onIntensity(+e.target.value)}
				/>
			</div>

			<div>
				<label className="block text-sm">Повторы: {iterations}</label>
				<input
					type="range"
					min={1}
					max={10}
					value={iterations}
					onChange={(e) => onIterations(+e.target.value)}
				/>
			</div>

			<div>
				<label className="block text-sm">Easing</label>
				<input
					type="text"
					value={easing}
					onChange={(e) => onEasing(e.target.value)}
					className="mt-1 block w-full p-2 rounded"
				/>
				<small className="text-xs">
					Пример: ease, linear, ease-in-out,
					cubic-bezier(0.2,0.8,0.2,1)
				</small>
			</div>

			<div className="flex gap-2">
				<button
					onClick={onPlay}
					className="px-4 py-2 rounded bg-blue-500 text-white"
				>
					Выполнить
				</button>
			</div>
		</div>
	);
}
