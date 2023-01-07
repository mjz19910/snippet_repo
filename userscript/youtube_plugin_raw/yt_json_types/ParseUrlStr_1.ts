type ParseUrlStr_1=SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1];
type ParseApiUrlStr=SplitOnce<Extract<SplitOnce<ParseUrlStr_1,"/">,["api",...any]>[1],"/">[1];