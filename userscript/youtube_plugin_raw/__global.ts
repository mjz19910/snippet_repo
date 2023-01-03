export {};
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
}