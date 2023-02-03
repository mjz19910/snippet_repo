type DoSearchExtract<T extends string>=
	T extends infer C extends `/${string}`?
	T_SplitOnce<Exclude<C,"/">,"/">[1] extends infer C1 extends string?
	Extract<T_SplitOnce<C1,"/">,[`${string}?${string}`]>[0]
	:never
	:never;
namespace UU_Old$1 {export type UU=DoSearchExtract<WatchUrlFormat>;}
type ParseUrlWithSearchIn=DoSearchExtract<WatchUrlFormat>;
type ParseUrlWithSearchIn_2=DoSearchExtract<D_PlaylistUrlFormat>;
