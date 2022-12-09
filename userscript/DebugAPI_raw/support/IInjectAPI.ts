declare global {
	interface IInjectAPI {
		saved_object_arrays: {}[][];
		ModuleLoadDbg: {};
		DisabledMulCompression: {};
		RemoteOriginConnection: {};
		remote_origin: CrossOriginConnection;
	}
}

// LocalHandler
declare global {
	interface IInjectAPI {
		LocalHandler: {};
	}
}

// elevate_event_handlers
declare global {
	interface IInjectAPI {
		elevate_event_handlers: {}[];
	}
}
// proxyTargetMap
declare global {
	interface IInjectAPI {
		ProxyTargetMap: {};
		proxyTargetMap: {};
	}
}
// saved_objects
declare global {
	interface IInjectAPI {
		saved_objects: [string,{name: string;}][];
	}
}
// parse_javascript_str
declare global {
	interface IInjectAPI {
		parse_javascript_str?: ((str: string) => void);
	}
}
// DebugAPI
declare global {
	interface IInjectAPI {
		DoCalc: {};
		reversePrototypeChain: {};
		ReversePrototypeChain: {};
		any_api_logger: {};
		parse_html_to_binary_arr: (html: string) => unknown[];
		run_modules_plugin: VoidCallbackWith<() => void>;
		run_wasm_plugin: VoidCallbackWith<() => void>;
		compress_main: VoidCallbackWith<(stats: {}) => void>;
		IterExtensions: {};
		getPlaybackRateMap: {};
		CreateObjURLCache: {};
		Repeat: {};
		CompressRepeated: {};
		to_tuple_arr: {};
		range_matches: {};
		function_as_string_vec: string[];
		CompressionStatsCalculator: {};
		HexRandomDataGenerator: {};
		EventListenerValue: {};
		GenericEvent: {};
		GenericDataEvent: {};
		GenericEventTarget: {};
		Dumper: {};
		RustSimpleTokenizer: {};
		RustSimpleParser: {};
		WeakValueRef: {};
		CSSCascade: {};
		OriginState: {};
		APIProxyManager: {};
		LoggingEventTarget: {};
		DebugAPI: DebugAPIType;
		AddEventListenerExtension: {};
		addEventListenerExtension: {
			elevate_handler(handler:EventListenersT):void;
		};
	}
}

type DebugAPIType={
	the(): DebugAPI_the;
};

interface DebugAPI_the {
	get_k(v: string): any;
	clearCurrentBreakpoint(): boolean;
}
type VoidCallbackWith<T extends (...args: any[]) => any>=VoidCallback<Parameters<T>,ReturnType<T>>;
class VoidCallback<U extends any[],C> {
	m_callback: ((...args: U) => C);
	constructor(callback: (...args: U) => C) {
		this.m_callback=callback;
	}
	/** @param {U} args */
	execute(...args: U) {
		return this.m_callback(...args);
	}
}

export {};

