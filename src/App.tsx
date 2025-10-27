import React, { useState, useRef } from "react";
import IconGrid from "./components/IconGrid";
import Controls from "./components/Controls";
import { icons } from "./icons";
import * as Anim from "./animations";

export default function App() {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const selectedElRef = useRef<Element | null>(null);
	const [selectedAnim, setSelectedAnim] = useState<Anim.AnimName>("Поворот");

	// control states
	const [duration, setDuration] = useState(800);
	const [intensity, setIntensity] = useState(120);
	const [iterations, setIterations] = useState(1);
	const [easing, setEasing] = useState("ease");

	const handleSelect = (id: string, el: Element | null) => {
		setSelectedId(id);
		selectedElRef.current = el;
	};

	const play = () => {
		if (!selectedId || !selectedElRef.current) {
			alert("Выберите иконку");
			return;
		}
		const fn = Anim.animations[selectedAnim as Anim.AnimName];
		if (!fn) {
			alert("Анимация не найдена");
			return;
		}
		fn(selectedElRef.current, {
			duration,
			easing,
			iterations,
			intensity,
		});
	};

	return (
		<div className="min-h-screen p-6 bg-gray-50">
			<h1 className="text-2xl font-bold mb-4">
				SVG Icon Animations — Проект
			</h1>
			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2">
					<IconGrid
						icons={icons}
						selectedId={selectedId}
						onSelect={handleSelect}
					/>
				</div>
				<div>
					<Controls
						animationList={Object.keys(Anim.animations)}
						selectedAnim={selectedAnim}
						onChangeAnim={(s) =>
							setSelectedAnim(s as Anim.AnimName)
						}
						duration={duration}
						onDuration={setDuration}
						intensity={intensity}
						onIntensity={setIntensity}
						iterations={iterations}
						onIterations={setIterations}
						easing={easing}
						onEasing={setEasing}
						onPlay={play}
					/>

					<div className="mt-4 text-sm text-gray-600">
						<p>Выбранная иконка: {selectedId ?? "нет"}</p>
						<p className="mt-2">
							Добавление новой иконки: редактируйте{" "}
							<code>src/icons.tsx</code> и добавляйте в массив{" "}
							<code>icons</code>.
						</p>
						<p className="mt-2">
							Добавление новой анимации: добавьте функцию в{" "}
							<code>src/animations.ts</code> и экспортируйте в
							объект <code>animations</code>.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
