type ExtractAfterStr<V extends string,U extends string>=SplitIntoGroups<V,`${string}`> extends infer Z? Z extends [U,...any[]]?Join<RemoveFirst<Z>,"">:never:never;