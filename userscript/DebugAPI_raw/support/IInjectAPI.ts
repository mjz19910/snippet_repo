import {
	CompressionStatsCalculator,
	DebugAPI,
} from "../DebugAPI.user";

export interface IInjectAPI_ extends IInjectAPI {}

// saved_object_arrays
declare global {
	interface IInjectAPI {
		saved_object_arrays?: {}[][];
	}
}

// ModuleLoadDbg
declare global {
	interface IInjectAPI {
		ModuleLoadDbg?: {};
	}
}

// DisabledMulCompression
declare global {
	interface IInjectAPI {
		DisabledMulCompression?: {};
	}
}

declare global {
	class ICrossOriginConnection {
		push_tcp_message(msg: any): void;
	}
}

// CrossOriginConnection
declare global {
	interface IInjectAPI {
		CrossOriginConnection?: {};
		remote_origin?: ICrossOriginConnection;
	}
}

// LocalHandler
declare global {
	interface IInjectAPI {
		Socket?: {};
	}
}

// elevate_event_handlers
declare global {
	interface IInjectAPI {
		elevate_event_handlers?: {}[];
	}
}

// ProxyTargetMap
declare global {
	interface IInjectAPI {
		ProxyTargetMap?: {};
		proxyTargetMap?: {};
	}
}

// saved_objects
declare global {
	interface IInjectAPI {
		saved_objects?: [string,{name: string;}][];
	}
}

// parse_javascript_str
declare global {
	interface IInjectAPI {
		parse_javascript_str?: ((str: string) => void);
	}
}

// DoCalc
declare global {
	interface IInjectAPI {
		DoCalc?: {};
	}
}

// ReversePrototypeChain
declare global {
	interface IInjectAPI {
		ReversePrototypeChain?: {};
		reversePrototypeChain?: {};
	}
}

// any_api_logger
declare global {
	interface IInjectAPI {
		any_api_logger?: {};
	}
}

// parse_html_to_binary_arr
declare global {
	interface IInjectAPI {
		parse_html_to_binary_arr?: (html: string) => unknown[];
	}
}

// run_wasm_plugin
declare global {
	interface IInjectAPI {
		run_modules_plugin?: VoidCallbackWith<() => void>;
		run_wasm_plugin?: VoidCallbackWith<() => void>;
	}
}

// compress_main
declare global {
	interface IInjectAPI {
		compress_main?: VoidCallback<[CompressionStatsCalculator],void>;
	}
}

// IterExtensions
declare global {
	interface IInjectAPI {
		IterExtensions?: {};
	}
}

// getPlaybackRateMap
declare global {
	interface IInjectAPI {
		getPlaybackRateMap?: {};
	}
}

// CreateObjURLCache
declare global {
	interface IInjectAPI {
		CreateObjURLCache?: {};
	}
}

// Repeat
declare global {
	interface IInjectAPI {
		Repeat?: {};
	}
}

// CompressRepeated
declare global {
	interface IInjectAPI {
		CompressRepeated?: {};
	}
}

// to_tuple_arr
declare global {
	interface IInjectAPI {
		to_tuple_arr?: {};
	}
}

// range_matches
declare global {
	interface IInjectAPI {
		range_matches?: {};
	}
}

// function_as_string_vec
declare global {
	interface IInjectAPI {
		function_as_string_vec?: string[];
	}
}

// CompressionStatsCalculator
declare global {
	interface IInjectAPI {
		CompressionStatsCalculator?: {};
	}
}

// HexRandomDataGenerator
declare global {
	interface IInjectAPI {
		HexRandomDataGenerator?: {};
	}
}

// EventListenerValue
declare global {
	interface IInjectAPI {
		EventListenerValue?: {};
	}
}

// GenericEvent
declare global {
	interface IInjectAPI {
		GenericEvent?: {};
	}
}

// GenericDataEvent
declare global {
	interface IInjectAPI {
		GenericDataEvent?: {};
	}
}

// RustSimpleTokenizer
declare global {
	interface IInjectAPI {
		RustSimpleTokenizer?: {};
		RustSimpleParser?: {};
	}
}

// OriginState
declare global {
	interface IInjectAPI {
		OriginState?: {};
	}
}

// APIProxyManager
declare global {
	interface IInjectAPI {
		APIProxyManager?: {};
	}
}

// LoggingEventTarget
declare global {
	interface IInjectAPI {
		LoggingEventTarget?: {};
	}
}

// AddEventListenerExtension
export interface IAddEventListenerExtension {
	elevate_handler(x: any): void;
}

declare global {
	interface IInjectAPI {
		AddEventListenerExtension?: {};
		addEventListenerExtension?: IAddEventListenerExtension;
	}
}

// DebugAPI
declare global {
	interface IInjectAPI {
		DebugAPI?: typeof DebugAPI;
	}
}

export type VoidCallbackWith<T extends (...args: any[]) => any>=VoidCallback<Parameters<T>,ReturnType<T>>;

/** @template {any[]} U @template C */
export class VoidCallback<U extends any[],C> {
	/** @type {(...args: U)=>C} */
	m_callback: ((...args: U) => C);
	/** @arg {(...args: U)=>C} callback */
	constructor(callback: (...args: U) => C) {
		this.m_callback=callback;
	}
	/** @param {U} args */
	execute(...args: U) {
		return this.m_callback(...args);
	}
}

export {};
