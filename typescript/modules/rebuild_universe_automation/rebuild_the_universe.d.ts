export class CompressedArray extends Array<string>{}
export class UncompressedArray extends Array<string>{}

export class AutoBuyState {
	debug: boolean;
	arr: number[];
	ratio: number;
	constructor();
	init(): void;
}

declare global {
	export interface Window {
	}
	export var Window: {
		prototype: Window;
		new(): Window;
	};
	interface CSSStyleSheet {
		replace(x: string): Promise<CSSStyleSheet>;
	}
	interface HTMLDivElement {
		style: CSSStyleDeclaration;
	}
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];

		// don't make an error, just do nothing
		stop(): void;
	}
}
