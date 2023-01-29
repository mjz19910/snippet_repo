import {HandleTypesEval_} from "./handle_types_eval.js";
declare global {
	interface Window {
		Polymer: {
			Class?: <T>(x: {}) => T;
		};
	}
}
declare global {
	interface URLSearchParams {
		[Symbol.iterator](): IterableIterator<[string,string]>;
		append(name: string,value: string): void;
		delete(name: string): void;
		entries(): IterableIterator<[string,string]>;
	}
	class HandleTypesEval<T,U> extends HandleTypesEval_<T,U> {}
}
