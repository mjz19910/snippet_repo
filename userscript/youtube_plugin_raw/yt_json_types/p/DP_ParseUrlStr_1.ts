type ParseUrlStr_1=T_SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1];
type ParseUrlStr_2=Extract<T_SplitOnce<ParseUrlStr_1,"/">,["youtubei",...any]>;
type ParseUrlStr_3=Extract<T_SplitOnce<ParseUrlStr_1,"/">,[any,any]>;
type ParseUrlStr_4=ParseUrlStr_2[1];
type ParseUrlStr_5=Extract<T_SplitOnce<Extract<ParseUrlStr_2[1],`${string}/${string}`>,"/">[1],`${string}/${string}`>;