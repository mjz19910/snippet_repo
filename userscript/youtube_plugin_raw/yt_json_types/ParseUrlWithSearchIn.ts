type DoSearchExtract<T extends `/${string}`>=
	T extends infer C extends `/${string}`?
	SplitOnce<Exclude<C,"/">,"/">[1] extends infer C1 extends string?
	Extract<SplitOnce<C1,"/">,[`${string}?${string}`]>[0]
	:never
	:never;
type UU=DoSearchExtract<WatchUrlFormat>;
type ParseUrlWithSearchIn=DoSearchExtract<WatchUrlFormat>;
type ParseUrlWithSearchIn_2=DoSearchExtract<PlaylistUrlFormat>;
