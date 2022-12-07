interface IInjectAPI {
	saved_object_arrays: {}[][];
	ModuleLoadDbg: {};
	DisabledMulCompression: {};
	RemoteOriginConnection: {};
	remote_origin: {};
}

// LocalHandler
interface IInjectAPI {
	LocalHandler: {};
}

// elevate_event_handlers
interface IInjectAPI {
	elevate_event_handlers: {}[];
}
// proxyTargetMap
interface IInjectAPI {
	ProxyTargetMap: {};
	proxyTargetMap: {};
}
// saved_objects
interface IInjectAPI {
	saved_objects: [string,{name: string;}][];
}
// parse_javascript_str
interface IInjectAPI {
	parse_javascript_str?: ((str: string) => void);
}
// DebugAPI
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
	addEventListenerExtension: {};
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

export {type IInjectAPI};
