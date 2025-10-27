import React from "react";
import { IconItem } from "../icons";

type Props = {
	icons: IconItem[];
	selectedId: string | null;
	onSelect: (id: string, el: Element | null) => void;
};

export default function IconGrid({ icons, selectedId, onSelect }: Props) {
	return (
		<div className="grid grid-cols-3 gap-4 p-4">
			{icons.map((item) => (
				<div
					key={item.id}
					className={`p-3 rounded-lg border transition-shadow cursor-pointer flex items-center justify-center ${
						selectedId === item.id
							? "ring-2 ring-blue-400 shadow-lg"
							: "hover:shadow-md"
					}`}
					onClick={(e) =>
						onSelect(
							item.id,
							(e.currentTarget.querySelector("svg") as Element) ??
								e.currentTarget
						)
					}
				>
					{/* Render SVG and ensure it fills container */}
					<div style={{ width: 64, height: 64 }}>{item.svg}</div>
				</div>
			))}
		</div>
	);
}
