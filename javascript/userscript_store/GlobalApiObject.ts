// youtube_plugin
export interface GlobalApiObject {
	gain_controller?: HTMLMediaElementGainController;
	yt_watch_page_loaded_handler?: {};
	plugin_overlay_element?: {};
	port_state?: {};
	dom_observer?: {};
	yt_handlers?: {};
	blob_create_args_arr?: {};
	yt_state_map?: {};
	PropertyHandler?: {};
	Seen?: {};
};

// DebugAPI
export interface GlobalApiObject {
	Repeat?: {},
	CompressRepeated?: {},
	to_tuple_arr?:{},
	range_matches?:{},
	CompressionStatsCalculator?:{},
	HexRandomDataGenerator?:{},
	EventListenerValue?:{},
	GenericEvent?:{},
	GenericDataEvent?:{},
	GenericEventTarget?:{},
	Dumper?:{},
	RustSimpleTokenizer?:{},
	RustSimpleParser?:{},
	WeakValueRef?:{},
	CSSCascade?:{},
	OriginState?:{},
	ConnectToRemoteOrigin?:{},
	APIProxyManager?:{},
	LoggingEventTarget?:{},
}
