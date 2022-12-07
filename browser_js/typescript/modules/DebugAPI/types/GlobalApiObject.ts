import {getPlaybackRateMap} from "../src/getPlaybackRateMap.js";
import {CreateObjURLCache} from "../src/CreateObjURLCache.js";
import {IterExtensions} from "../src/IterExtensions.js";
import {to_tuple_arr} from "../src/to_tuple_arr.js";
import {CompressRepeated} from "../src/CompressRepeated.js";
import {Repeat_1} from "./repeat/Repeat_1.js";
import {range_matches} from "../src/range_matches.js";
import {HexRandomDataGenerator} from "../src/HexRandomDataGenerator.js";
import {EventListenerValue} from "../src/EventListenerValue.js";
import {GenericDataEvent} from "../src/GenericDataEvent.js";
import {Dumper} from "../src/Dumper.js";
import {RustSimpleTokenizer} from "../src/debug_api/RustSimpleTokenizer.js";
import {RustTokenTreeParser} from "../src/debug_api/RustTokenTreeParser.js";
import {WeakValueRef} from "../src/WeakValueRef.js";
import {CSSCascade} from "../src/CSSCascade.js";
import {OriginState} from "../src/OriginState.js";
import {ApiProxyManager} from "../src/debug_api/ApiProxyManager.js";
import {LoggingEventTarget} from "../src/debug_api/LoggingEventTarget.js";
import {DebugApi} from "../src/debug_api/DebugApi.js";
import {GenericEventTarget} from "../src/GenericEventTarget.js";
import {GenericEvent} from "../src/GenericEvent.js";
import {VoidCallbackWith} from "./VoidCallbackWith.js";
import {PluginOverlayElement} from "../../youtube_plugin/player_plugin_activate/elements/PluginOverlayElement.js";
import {CompressionStatsCalculator} from "./CompressionStatsCalculator.js";
import {RemoteOriginConnection} from "../src/RemoteOriginConnection.js";

// DebugApi
declare global {
	interface GlobalApiObject {
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
		plugin_overlay_element?: PluginOverlayElement;
		gain_controller?: {};
		any_api_logger?: ApiProxyManager;
		parse_html_to_binary_arr?: (html: string) => unknown[];
		run_modules_plugin?: VoidCallbackWith<() => void>;
		run_wasm_plugin?: VoidCallbackWith<() => void>;
		compress_main?: VoidCallbackWith<(stats: CompressionStatsCalculator) => void>;
		IterExtensions?: typeof IterExtensions;
		getPlaybackRateMap?: typeof getPlaybackRateMap;
		CreateObjURLCache?: typeof CreateObjURLCache;
		Repeat?: typeof Repeat_1;
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
		ApiProxyManager?: typeof ApiProxyManager;
		LoggingEventTarget?: typeof LoggingEventTarget;
		DebugApi?: typeof DebugApi;
	}
}
