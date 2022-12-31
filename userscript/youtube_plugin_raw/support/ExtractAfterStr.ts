import {Join} from "./Join.js";
import {RemoveFirst} from "./parse_url/RemoveFirst.js";
import {SplitIntoGroups} from "./yt_api/_/s/SplitIntoGroups.js";

export type ExtractAfterStr<V extends string,U extends string>=SplitIntoGroups<V,`${string}`> extends infer Z? Z extends [U,...any[]]?Join<RemoveFirst<Z>>:never:never;
