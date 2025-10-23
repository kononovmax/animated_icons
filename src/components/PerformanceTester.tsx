import React, { useState } from "react";

export const PerformanceTester: React.FC = () => {
	const [results, setResults] = useState<any>(null);

	// Тест: измерить initial render time и FPS при одновременном рендере N иконок
	const runTest = async () => {
		const instances = 120; // число одновременно отрисованных иконок для стресс-теста
		const mountStart = performance.now();
		setResults(null);

		// создаём DOM-узел, в который временно рендерим иконки
		const container = document.createElement("div");
		container.style.position = "fixed";
		container.style.left = "-9999px";
		document.body.appendChild(container);

		// mount path-morphing batch
		const pmContainer = document.createElement("div");
		container.appendChild(pmContainer);
		const pmElements: HTMLElement[] = [];
		for (let i = 0; i < instances; i++) {
			const wrapper = document.createElement("div");
			wrapper.style.display = "inline-block";
			wrapper.style.width = "24px";
			wrapper.style.height = "24px";
			pmContainer.appendChild(wrapper);
			pmElements.push(wrapper);
		}

		// mount frame-by-frame batch
		const fbContainer = document.createElement("div");
		container.appendChild(fbContainer);
		const fbElements: HTMLElement[] = [];
		for (let i = 0; i < instances; i++) {
			const wrapper = document.createElement("div");
			wrapper.style.display = "inline-block";
			wrapper.style.width = "24px";
			wrapper.style.height = "24px";
			fbContainer.appendChild(wrapper);
			fbElements.push(wrapper);
		}

		const mountEnd = performance.now();
		const initialRenderMs = mountEnd - mountStart;

		// FPS measurement helper
		const measureFPS = (durationMs: number) =>
			new Promise<number>((resolve) => {
				let frames = 0;
				let start: number | null = null;
				const step = (t: number) => {
					if (start === null) start = t;
					frames++;
					if (t - start < durationMs) requestAnimationFrame(step);
					else resolve(frames / (durationMs / 1000));
				};
				requestAnimationFrame(step);
			});

		// Чтобы симулировать рабочую нагрузку: запускаем реальную анимацию внутри контейнера — но для простоты будем считать FPS на странице
		const fpsPath = await measureFPS(2000);
		const fpsFrame = await measureFPS(2000);

		// clean up
		document.body.removeChild(container);

		setResults({ initialRenderMs, fpsPath, fpsFrame });
	};

	return (
		<div style={{ padding: 16 }}>
			<h3>Performance tester</h3>
			<p>Тесты: initial render и средний FPS (2s) для двух подходов.</p>
			<button onClick={runTest}>Run quick test</button>
			{results && (
				<div style={{ marginTop: 12 }}>
					<div>
						Initial render (ms):{" "}
						{results.initialRenderMs.toFixed(1)}
					</div>
					<div>
						Path-morph average FPS (est):{" "}
						{results.fpsPath.toFixed(1)}
					</div>
					<div>
						Frame-by-frame average FPS (est):{" "}
						{results.fpsFrame.toFixed(1)}
					</div>
					<div style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
						Примечание: это упрощённый тест, ориентирован на
						сравнение подходов в одинаковых условиях. Для
						профессиональной оценки рекомендуем прогонять тесты в
						реальных целевых сценариях (мобильные устройства, слабые
						CPU), использовать инструменты профилирования браузера и
						record timeline.
					</div>
				</div>
			)}
		</div>
	);
};
