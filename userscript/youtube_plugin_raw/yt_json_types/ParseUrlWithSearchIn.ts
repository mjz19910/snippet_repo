type ParseUrlWithSearchIn=Extract<SplitOnce<SplitOnce<Exclude<WatchUrlFormat,"/">,"/">[1],"/">,[`${string}?${string}`]>[0];
type ParseUrlWithSearchIn_2=Exclude<Extract<SplitOnce<SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1],"/">,[`${string}?${string}`]>[0],`watch?${string}`>;
