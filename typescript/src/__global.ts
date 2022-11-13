import {ErrorStackTrace} from "./ErrorStackTrace";

export {};

declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: ErrorStackTrace,constructorOpt?: T): void;
	}

	interface HTMLDivElement {
		style: CSSStyleDeclaration;
	}
}
