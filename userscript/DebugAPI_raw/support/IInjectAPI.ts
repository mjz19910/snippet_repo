import {AddEventListenerExtension, CompressionStatsCalculator, CrossOriginConnection, DebugAPI} from "../DebugAPI.user";

declare global {
	interface IInjectAPI {
		saved_object_arrays?: {}[][];
	}
}
declare global {
	interface IInjectAPI {
		ModuleLoadDbg?: {};
	}
}
declare global {
	interface IInjectAPI {
		DisabledMulCompression?: {};
	}
}
declare global {
	interface IInjectAPI {
		RemoteOriginConnection?: {};
		remote_origin?: CrossOriginConnection;
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
// proxyTargetMap
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
declare global {
	interface IInjectAPI {
		DoCalc?: {};
	}
}
declare global {
	interface IInjectAPI {
		reversePrototypeChain?: {};
		ReversePrototypeChain?: {};
	}
}
declare global {
	interface IInjectAPI {
		any_api_logger?: {};
	}
}
declare global {
	interface IInjectAPI {
		parse_html_to_binary_arr?: (html: string) => unknown[];
	}
}
declare global {
	interface IInjectAPI {
		run_modules_plugin?: VoidCallbackWith<() => void>;
		run_wasm_plugin?: VoidCallbackWith<() => void>;
	}
}
declare global {
	interface IInjectAPI {
		compress_main?: VoidCallback<[CompressionStatsCalculator],void>;
	}
}
declare global {
	interface IInjectAPI {
		IterExtensions?: {};
	}
}
declare global {
	interface IInjectAPI {
		getPlaybackRateMap?: {};
	}
}
declare global {
	interface IInjectAPI {
		CreateObjURLCache?: {};
	}
}
declare global {
	interface IInjectAPI {
		Repeat?: {};
	}
}
declare global {
	interface IInjectAPI {
		CompressRepeated?: {};
	}
}
declare global {
	interface IInjectAPI {
		to_tuple_arr?: {};
	}
}
declare global {
	interface IInjectAPI {
		range_matches?: {};
	}
}
declare global {
	interface IInjectAPI {
		function_as_string_vec?: string[];
	}
}
declare global {
	interface IInjectAPI {
		CompressionStatsCalculator?: {};
	}
}
declare global {
	interface IInjectAPI {
		HexRandomDataGenerator?: {};
	}
}
declare global {
	interface IInjectAPI {
		EventListenerValue?: {};
	}
}
declare global {
	interface IInjectAPI {
		GenericEvent?: {};
		GenericDataEvent?: {};
		GenericEventTarget?: {};
	}
}
declare global {
	interface IInjectAPI {
		Dumper?: {};
	}
}
declare global {
	interface IInjectAPI {
		RustSimpleTokenizer?: {};
		RustSimpleParser?: {};
	}
}
declare global {
	interface IInjectAPI {
		WeakValueRef?: {};
	}
}
declare global {
	interface IInjectAPI {
		CSSCascade?: {};
	}
}
declare global {
	interface IInjectAPI {
		OriginState?: {};
	}
}
declare global {
	interface IInjectAPI {
		APIProxyManager?: {};
	}
}
declare global {
	interface IInjectAPI {
		LoggingEventTarget?: {};
	}
}
declare global {
	interface IInjectAPI {
		AddEventListenerExtension?: {};
		addEventListenerExtension?: AddEventListenerExtension;
	}
}

// DebugAPI
declare global {
	interface IInjectAPI {
		DebugAPI?: typeof DebugAPI;
	}
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

