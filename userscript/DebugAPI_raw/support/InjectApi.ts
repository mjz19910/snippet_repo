import {
	add_function,
	CompressionStatsCalculator,
	_DebugApiHolders,
} from "../DebugApi.user";
import {DebugApiType} from "./DebugApiType";
import {IAddEventListenerExtension} from "./IAddEventListenerExtension";
import {ICrossOriginConnection} from "./ICrossOriginConnection";
import {SavedInstanceType} from "./SavedInstanceType";
import {VoidCallback} from "./VoidCallback.js";
import {VoidCallbackWith} from "./VoidCallbackWith.js";

export const InjectApiHolder=_DebugApiHolders['InjectApi'];

// saved_instances
declare global {
	interface InjectApi {
		saved_instances?: SavedInstanceType[];
	}
}

// saved_object_arrays
declare global {
	interface InjectApi {
		saved_object_arrays?: {}[][];
	}
}

// add_function
declare global {
	interface InjectApi {
		add_function?: typeof add_function;
		saved_function_objects?: [string,{name: string;}][];
	}
}

// add_array
declare global {
	interface InjectApi {
		add_array?: {};
	}
}

// add_object_with_name
declare global {
	interface InjectApi {
		add_object_with_name?: {};
	}
}

// LoggingEventTarget
declare global {
	interface InjectApi {
		LoggingEventTarget?: {};
	}
}

// APIProxyManager
declare global {
	interface InjectApi {
		APIProxyManager?: {};
		any_api_logger?: {};
	}
}

// ReversePrototypeChain
declare global {
	interface InjectApi {
		ReversePrototypeChain?: {};
		reversePrototypeChain?: {};
	}
}

// ProxyTargetMap
declare global {
	interface InjectApi {
		ProxyTargetMap?: {};
		proxyTargetMap?: {};
	}
}

// elevate_event_handlers
declare global {
	interface InjectApi {
		elevate_event_handlers?: {}[];
	}
}

// AddEventListenerExtension
declare global {
	interface InjectApi {
		AddEventListenerExtension?: {};
		addEventListenerExtension?: IAddEventListenerExtension;
	}
}

// IterExtensions
declare global {
	interface InjectApi {
		IterExtensions?: {};
	}
}

// getPlaybackRateMap
declare global {
	interface InjectApi {
		getPlaybackRateMap?: {};
	}
}

// CreateObjURLCache
declare global {
	interface InjectApi {
		CreateObjURLCache?: {};
	}
}

// Repeat
declare global {
	interface InjectApi {
		Repeat?: {};
	}
}

// CompressRepeated
declare global {
	interface InjectApi {
		CompressRepeated?: {};
	}
}

// to_tuple_arr
declare global {
	interface InjectApi {
		to_tuple_arr?: {};
	}
}

// DisabledMulCompression
declare global {
	interface InjectApi {
		DisabledMulCompression?: {};
	}
}

// run_wasm_plugin
declare global {
	interface InjectApi {
		run_modules_plugin?: VoidCallbackWith<() => void>;
		run_wasm_plugin?: VoidCallbackWith<() => void>;
	}
}

// ModuleLoadDbg
declare global {
	interface InjectApi {
		ModuleLoadDbg?: {};
	}
}

// function_as_string_vec
declare global {
	interface InjectApi {
		function_as_string_vec?: string[];
	}
}

// CompressionStatsCalculator
declare global {
	interface InjectApi {
		CompressionStatsCalculator?: {};
	}
}

// range_matches
declare global {
	interface InjectApi {
		range_matches?: {};
	}
}

// DoCalc
declare global {
	interface InjectApi {
		DoCalc?: {};
	}
}

// compress_main
declare global {
	interface InjectApi {
		compress_main?: VoidCallback<[CompressionStatsCalculator],void>;
	}
}

// HexRandomDataGenerator
declare global {
	interface InjectApi {
		HexRandomDataGenerator?: {};
	}
}

// EventListenerValue
declare global {
	interface InjectApi {
		EventListenerValue?: {};
	}
}

// GenericEvent
declare global {
	interface InjectApi {
		GenericEvent?: {};
	}
}

// GenericDataEvent
declare global {
	interface InjectApi {
		GenericDataEvent?: {};
	}
}

// Socket
declare global {
	interface InjectApi {
		Socket?: {};
	}
}

// OriginState
declare global {
	interface InjectApi {
		OriginState?: {};
	}
}

// CrossOriginConnection
declare global {
	interface InjectApi {
		CrossOriginConnection?: {};
		remote_origin?: ICrossOriginConnection;
	}
}

// parse_javascript_str
declare global {
	interface InjectApi {
		parse_javascript_str?: ((str: string) => void);
	}
}

// parse_html_to_binary_arr
declare global {
	interface InjectApi {
		parse_html_to_binary_arr?: (html: string) => unknown[];
	}
}

// DebugApi
declare global {
	interface InjectApi {
		DebugApi?: DebugApiType;
	}
}

export {type InjectApi};
