import {SplitIntoGroups} from "./support/yt_api/_/s/SplitIntoGroups.js";

/** @typedef {typeof value extends infer V ? import("./support/yt_api/_/s/SplitIntoGroups.js").SplitIntoGroups<V,`${string}`> extends infer Z?Z extends ["FE",...any[]]?import("./support/parse_url/RemoveFirst.js").RemoveFirst<Z> extends (infer A extends string[])?import("./Join.js").Join<A>:never:never:never:never} KnownParts */

export type ExtractAfterStr<V extends string,U extends string>=SplitIntoGroups<V,`${string}`> extends infer Z? Z extends [U,...any[]]? import("./support/parse_url/RemoveFirst.js").RemoveFirst<Z> extends (infer A extends string[])? import("./Join.js").Join<A>:never:never:never;
