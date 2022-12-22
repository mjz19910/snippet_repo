import {
	CompressionStatsCalculator,
	DebugAPI,
} from "../DebugAPI.user";

export const Holder=Symbol.for("InjectApi");

// saved_instances
declare global {
	interface InjectAPI {
		saved_instances?: SavedArrayOf<[{name: string;},{}]>;
	}
}

// saved_object_arrays
declare global {
	interface InjectAPI {
		saved_object_arrays?: {}[][];
	}
}

// saved_objects
declare global {
	interface InjectAPI {
		saved_objects?: [string,{name: string;}][];
	}
}

// saved_objects
declare global {
	interface InjectAPI {
		add_function?: (callable: {name: string;}) => void;
	}
}

// LoggingEventTarget
declare global {
	interface InjectAPI {
		LoggingEventTarget?: {};
	}
}

// APIProxyManager
declare global {
	interface InjectAPI {
		APIProxyManager?: {};
	}
}

// ReversePrototypeChain
declare global {
	interface InjectAPI {
		ReversePrototypeChain?: {};
		reversePrototypeChain?: {};
	}
}

// ProxyTargetMap
declare global {
	interface InjectAPI {
		ProxyTargetMap?: {};
		proxyTargetMap?: {};
	}
}

// elevate_event_handlers
declare global {
	interface InjectAPI {
		elevate_event_handlers?: {}[];
	}
}

// AddEventListenerExtension
declare global {
	interface InjectAPI {
		AddEventListenerExtension?: {};
		addEventListenerExtension?: IAddEventListenerExtension;
	}
}

// IterExtensions
declare global {
	interface InjectAPI {
		IterExtensions?: {};
	}
}

// // ModuleLoadDbg
// declare global {
// 	interface InjectAPI {
// 		ModuleLoadDbg?: {};
// 	}
// }

// // DisabledMulCompression
// declare global {
// 	interface InjectAPI {
// 		DisabledMulCompression?: {};
// 	}
// }

// declare global {
// 	class ICrossOriginConnection {
// 		push_tcp_message(msg: any): void;
// 	}
// }

// // CrossOriginConnection
// declare global {
// 	interface InjectAPI {
// 		CrossOriginConnection?: {};
// 		remote_origin?: ICrossOriginConnection;
// 	}
// }

// // LocalHandler
// declare global {
// 	interface InjectAPI {
// 		Socket?: {};
// 	}
// }

// // parse_javascript_str
// declare global {
// 	interface InjectAPI {
// 		parse_javascript_str?: ((str: string) => void);
// 	}
// }

// // DoCalc
// declare global {
// 	interface InjectAPI {
// 		DoCalc?: {};
// 	}
// }

// // any_api_logger
// declare global {
// 	interface InjectAPI {
// 		any_api_logger?: {};
// 	}
// }

// // parse_html_to_binary_arr
// declare global {
// 	interface InjectAPI {
// 		parse_html_to_binary_arr?: (html: string) => unknown[];
// 	}
// }

// // run_wasm_plugin
// declare global {
// 	interface InjectAPI {
// 		run_modules_plugin?: VoidCallbackWith<() => void>;
// 		run_wasm_plugin?: VoidCallbackWith<() => void>;
// 	}
// }

// // compress_main
// declare global {
// 	interface InjectAPI {
// 		compress_main?: VoidCallback<[CompressionStatsCalculator],void>;
// 	}
// }

// // getPlaybackRateMap
// declare global {
// 	interface InjectAPI {
// 		getPlaybackRateMap?: {};
// 	}
// }

// // CreateObjURLCache
// declare global {
// 	interface InjectAPI {
// 		CreateObjURLCache?: {};
// 	}
// }

// // Repeat
// declare global {
// 	interface InjectAPI {
// 		Repeat?: {};
// 	}
// }

// // CompressRepeated
// declare global {
// 	interface InjectAPI {
// 		CompressRepeated?: {};
// 	}
// }

// // to_tuple_arr
// declare global {
// 	interface InjectAPI {
// 		to_tuple_arr?: {};
// 	}
// }

// // range_matches
// declare global {
// 	interface InjectAPI {
// 		range_matches?: {};
// 	}
// }

// // function_as_string_vec
// declare global {
// 	interface InjectAPI {
// 		function_as_string_vec?: string[];
// 	}
// }

// // CompressionStatsCalculator
// declare global {
// 	interface InjectAPI {
// 		CompressionStatsCalculator?: {};
// 	}
// }

// // HexRandomDataGenerator
// declare global {
// 	interface InjectAPI {
// 		HexRandomDataGenerator?: {};
// 	}
// }

// // EventListenerValue
// declare global {
// 	interface InjectAPI {
// 		EventListenerValue?: {};
// 	}
// }

// // GenericEvent
// declare global {
// 	interface InjectAPI {
// 		GenericEvent?: {};
// 	}
// }

// // GenericDataEvent
// declare global {
// 	interface InjectAPI {
// 		GenericDataEvent?: {};
// 	}
// }

// // RustSimpleTokenizer
// declare global {
// 	interface InjectAPI {
// 		RustSimpleTokenizer?: {};
// 		RustSimpleParser?: {};
// 	}
// }

// // OriginState
// declare global {
// 	interface InjectAPI {
// 		OriginState?: {};
// 	}
// }

// export interface IAddEventListenerExtension {
// 	elevate_handler(x: any): void;
// }

// // DebugAPI
// declare global {
// 	interface InjectAPI {
// 		DebugAPI?: typeof DebugAPI;
// 	}
// }

// export type VoidCallbackWith<T extends (...args: any[]) => any>=VoidCallback<Parameters<T>,ReturnType<T>>;

// /** @template {any[]} U @template C */
// export class VoidCallback<U extends any[],C> {
// 	/** @type {(...args: U)=>C} */
// 	m_callback: ((...args: U) => C);
// 	/** @arg {(...args: U)=>C} callback */
// 	constructor(callback: (...args: U) => C) {
// 		this.m_callback=callback;
// 	}
// 	/** @param {U} args */
// 	execute(...args: U) {
// 		return this.m_callback(...args);
// 	}
// }

// export {};
