import React, { useState } from "react";
import { ICONS } from "./icons";
import { MultiMorphIcon } from "./components/MultiMorphIcon";
import { FrameByFrameIcon } from "./components/FrameByFrameIcon";
import { PerformanceTester } from "./components/PerformanceTester";

const App: React.FC = () => {
	const [mode, setMode] = useState<"path" | "frame">("path");

	return (
		<div style={{ fontFamily: "Inter, Roboto, sans-serif", padding: 20 }}>
			<h1 style={{ margin: 0 }}>Icon animation prototype (24×24)</h1>
			<p style={{ color: "#666" }}>
				Два подхода: path-morphing и frame-by-frame. Заглушки вместо
				изображений для покадровки.
			</p>

			<div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
				<button
					onClick={() => setMode("path")}
					style={{
						padding: "8px 12px",
						background: mode === "path" ? "#0366d6" : "#eee",
						color: mode === "path" ? "white" : "black",
					}}
				>
					Path morph
				</button>
				<button
					onClick={() => setMode("frame")}
					style={{
						padding: "8px 12px",
						background: mode === "frame" ? "#0366d6" : "#eee",
						color: mode === "frame" ? "white" : "black",
					}}
				>
					Frame-by-frame
				</button>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(10, 28px)",
					gap: 8,
					alignItems: "center",
				}}
			>
				{ICONS.map((icon) => (
					<div
						key={icon.id}
						title={icon.name}
						style={{ width: 24, height: 24 }}
					>
						{mode === "path" ? (
							<MultiMorphIcon
								paths={icon.paths}
								durationMs={700}
							/>
						) : (
							<FrameByFrameIcon
								framesCount={6}
								size={24}
								fps={12}
							/>
						)}
					</div>
				))}
			</div>

			<PerformanceTester />
		</div>
	);
};

export default App;
