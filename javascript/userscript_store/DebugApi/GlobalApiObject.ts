// DebugAPI
export interface GlobalApiObject {
	IterExtensions: typeof IterExtensions;
	CreateObjURLCache: typeof CreateObjURLCache;
	getPlaybackRateMap: (include_uninteresting: boolean) => Map<any,any>;
	Repeat: never,
	CompressRepeated: never,
	to_tuple_arr: never,
	range_matches: never,
	CompressionStatsCalculator: never,
	HexRandomDataGenerator: never,
	EventListenerValue: never,
	GenericEvent: never,
	GenericDataEvent: never,
	GenericEventTarget: never,
	Dumper: never,
	RustSimpleTokenizer: never,
	RustSimpleParser: never,
	WeakValueRef: never,
	CSSCascade: never,
	OriginState: never,
	ConnectToRemoteOrigin: never,
	APIProxyManager: never,
	LoggingEventTarget: never,
}
