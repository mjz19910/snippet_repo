// DebugAPI
export interface GlobalApiObject {
	s_func: string[];
	HexRandomDataGenerator: typeof HexRandomDataGenerator;
	CompressionStatsCalculator: typeof CompressionStatsCalculator;
	range_matches: (arr: any[],idx: number,range: number) => boolean;
	to_tuple_arr: <T,U>(a: T[],b: U[]) => [T,U][];
	CompressRepeated: typeof CompressRepeated;
	Repeat: typeof Repeat;
	IterExtensions: typeof IterExtensions;
	CreateObjURLCache: typeof CreateObjURLCache;
	getPlaybackRateMap: (include_uninteresting: boolean) => Map<any,any>;
}
