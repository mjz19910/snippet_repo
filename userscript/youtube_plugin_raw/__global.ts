export {};
declare global {
	interface Window {
		Polymer: {Class?: <T>(x: {}) => T;};
		__youtube_plugin_base_loaded__?: boolean;
		__yt_plugin_log_imports__?: boolean;
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
	var required: PluginStore["mod$YoutubePluginBase"]["required"];
	type PluginStore=import("./zb_plugin_types/PluginStore.js").PluginStore;
	type ServiceLoader=InstanceType<PluginStore["mod$ServiceLoader"]["ServiceLoader"]>;
}