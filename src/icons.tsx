import React from "react";

export type IconItem = {
	id: string;
	name: string;
	svg: React.ReactElement;
};

// Put your SVGs here. Keep them as React elements so they are easy to render and style.
export const icons: IconItem[] = [
	{
		id: "star",
		name: "Star",
		svg: (
			<svg
				viewBox="0 0 24 24"
				width="48"
				height="48"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21Z" />
			</svg>
		),
	},
];
