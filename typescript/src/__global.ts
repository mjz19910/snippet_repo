export {};

declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: {stack?: string;},constructorOpt?: T): void;
	}

	interface HTMLDivElement {
		style: CSSStyleDeclaration;
	}
}
