export {};

declare global {
	interface Window {
		module_list: WebAssembly.Module[];
	}
}
