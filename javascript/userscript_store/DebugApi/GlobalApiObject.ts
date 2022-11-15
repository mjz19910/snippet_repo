// DebugAPI
export interface GlobalApiObject {
	IterExtensions: typeof IterExtensions;
	CreateObjURLCache: typeof CreateObjURLCache;
	getPlaybackRateMap: (include_uninteresting: boolean) => Map<any,any>;
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
