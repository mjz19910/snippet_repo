import {WatchUrlFormat} from "../yt_json_types/d/group_D.js";
import {D_PlaylistUrlFormat} from "../yt_json_types/d/mod_D/DU_T/DU.js";
import {T_SplitOnce} from "../yt_json_types/stu/group_T.js";

type DoSearchExtract<T extends string>=
	T extends infer C extends `/${string}`?
	T_SplitOnce<Exclude<C,"/">,"/">[1] extends infer C1 extends string?
	Extract<T_SplitOnce<C1,"/">,[`${string}?${string}`]>[0]
	:never
	:never;
export namespace UU_Old$1 {export type UU=DoSearchExtract<WatchUrlFormat>;}
export type ParseUrlWithSearchIn=DoSearchExtract<WatchUrlFormat>;
export type ParseUrlWithSearchIn_2=DoSearchExtract<D_PlaylistUrlFormat>;
