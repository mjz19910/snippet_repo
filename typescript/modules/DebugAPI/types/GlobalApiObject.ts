import {getPlaybackRateMap} from "../src/getPlaybackRateMap.js";
import {CreateObjURLCache} from "../src/CreateObjURLCache.js";
import {IterExtensions} from "../src/IterExtensions.js";
import {to_tuple_arr} from "../src/to_tuple_arr.js";
import {CompressRepeated} from "../src/CompressRepeated.js";
import {Repeat} from "../types/repeat/Repeat.js";
import {range_matches} from "../src/range_matches.js";
import {CompressionStatsCalculator} from "./CompressionStatsCalculator.js";
import {HexRandomDataGenerator} from "../src/HexRandomDataGenerator.js";
import {EventListenerValue} from "../src/EventListenerValue.js";
import {GenericDataEvent} from "../src/GenericDataEvent.js";
import {Dumper} from "../src/Dumper.js";
import {RustSimpleTokenizer} from "../src/debug_api/RustSimpleTokenizer.js";
import {RustTokenTreeParser} from "../src/debug_api/RustTokenTreeParser.js";
import {WeakValueRef} from "../src/WeakValueRef.js";
import {CSSCascade} from "../src/CSSCascade.js";
import {OriginState} from "../src/OriginState.js";
import {RemoteOriginConnection} from "../src/debug_api/RemoteOriginConnection.js";
import {APIProxyManager} from "../src/debug_api/APIProxyManager.js";
import {LoggingEventTarget} from "../src/debug_api/LoggingEventTarget.js";
import {DebugAPI} from "../src/debug_api/DebugAPI.js";
import {GenericEventTarget} from "../src/GenericEventTarget.js";
import {GenericEvent} from "../src/GenericEvent.js";
import {VoidCallbackWith} from "./VoidCallbackWith.js";

// DebugAPI
declare global {
	interface GlobalApiObject {
		any_api_logger?: APIProxyManager;
		parse_html_to_binary_arr?: (html: string) => unknown[];
		run_modules_plugin?: VoidCallbackWith<() => void>;
		run_wasm_plugin?: VoidCallbackWith<() => void>;
		compress_main?: VoidCallbackWith<(stats: CompressionStatsCalculator) => void>;
		IterExtensions?: typeof IterExtensions;
		getPlaybackRateMap?: typeof getPlaybackRateMap;
		CreateObjURLCache?: typeof CreateObjURLCache;
		Repeat?: typeof Repeat;
		CompressRepeated?: typeof CompressRepeated;
		to_tuple_arr?: typeof to_tuple_arr;
		range_matches?: typeof range_matches;
		function_as_string_vec?: string[];
		CompressionStatsCalculator?: typeof CompressionStatsCalculator;
		HexRandomDataGenerator?: typeof HexRandomDataGenerator;
		EventListenerValue?: typeof EventListenerValue;
		GenericEvent?: typeof GenericEvent;
		GenericDataEvent?: typeof GenericDataEvent;
		GenericEventTarget?: typeof GenericEventTarget;
		Dumper?: typeof Dumper;
		RustSimpleTokenizer?: typeof RustSimpleTokenizer;
		RustSimpleParser?: typeof RustTokenTreeParser;
		WeakValueRef?: typeof WeakValueRef;
		CSSCascade?: typeof CSSCascade;
		OriginState?: typeof OriginState;
		ConnectToRemoteOrigin?: typeof RemoteOriginConnection;
		APIProxyManager?: typeof APIProxyManager;
		LoggingEventTarget?: typeof LoggingEventTarget;
		DebugAPI?: typeof DebugAPI;
		// yt plugin
		Seen?: {};
		PropertyHandler?: {};
		dom_observer?: {};
		port_state?: {};
		yt_state_map?: {};
		yt_handlers?: {};
		yt_watch_page_loaded_handler?: {};
		blob_create_args_arr?: {};
		HTMLMediaElementGainController?: {};
	}
}
