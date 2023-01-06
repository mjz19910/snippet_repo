type ParseUrlStr_1=RemoveFirst<SplitOnce<Exclude<YtUrlFormat,"/">,"/">>[0];
type ParseUrlStr_3=Extract<SplitOnce<ParseUrlStr_1,"/">,[any,any]>;