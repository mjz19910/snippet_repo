import {IAddEventListenerExtension} from "./IAddEventListenerExtension";
import {ICrossOriginConnection} from "./ICrossOriginConnection";
import {SavedInstanceType} from "./SavedInstanceType";
import {VoidCallback} from "./VoidCallback.js";
import {VoidCallbackWith} from "./VoidCallbackWith.js";

declare global {
	interface InjectApi {
		modules?: Map<string,{}>;
		iterate_tracking_params?: () => void;
		saved_instances?: SavedInstanceType[];
		saved_object_arrays?: {}[][];
		saved_function_objects?: [string,{name: string;}][];
		add_array?: {};
		add_object_with_name?: {};
		LoggingEventTarget?: {};
		ApiProxyManager?: {};
		any_api_logger?: {};
		ReversePrototypeChain?: {};
		reversePrototypeChain?: {};
		ProxyTargetMap?: {};
		proxyTargetMap?: {};
		new_elevated_event_handlers?: {}[];
		AddEventListenerExtension?: {};
		addEventListenerExtension?: IAddEventListenerExtension;
		IterExtensions?: {};
		getPlaybackRateMap?: {};
		CreateObjURLCache?: {};
		RepeatImpl_0?: {};
		CompressRepeated?: {};
		to_tuple_arr?: {};
		DisabledMulCompression?: {};
		// run_wasm_plugin
		run_modules_plugin?: VoidCallbackWith<() => void>;
		run_wasm_plugin?: VoidCallbackWith<() => void>;
		function_as_string_vec?: string[];
		CompressionStatsCalculator?: {};
		range_matches?: {};
		DoCalc?: {};
		compress_main?: VoidCallback<[CompressionStatsCalculator],void>;
		HexRandomDataGenerator?: {};
		EventListenerValue?: {};
		GenericEvent?: {};
		GenericDataEvent?: {};
		Socket?: {};
		OriginState?: {};
		CrossOriginConnection?: {};
		remote_origin?: ICrossOriginConnection;
		parse_javascript_str?: ((str: string) => void);
		parse_html_to_binary_arr?: (html: string) => unknown[];
		// DebugApi
		DebugApi?: DebugApiType;
	}
}