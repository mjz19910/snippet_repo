type ParseUrlStr_1=SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1];
type ParseUrlStr_2=Extract<SplitOnce<ParseUrlStr_1,"/">,["youtubei",...any]>;
type ParseUrlStr_4=ParseUrlStr_2[1];
type ParseUrlStr_5=Extract<SplitOnce<Extract<ParseUrlStr_2[1],`${string}/${string}`>,"/">[1],`${string}/${string}`>;