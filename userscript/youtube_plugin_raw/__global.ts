export {};
declare global {
	interface Window {
		Polymer: {Class?: <T>(x: {}) => T;};
		__youtube_plugin_base_loaded__?: boolean;
		__plugin_modules__?: Partial<PluginStore>;
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
