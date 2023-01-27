namespace NS_DP_Parse {
	type GA_ParseUrlStr_1=[T_SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1]];
	export type GA_ParseUrlStr_2=[
		...GA_ParseUrlStr_1,
		Extract<T_SplitOnce<GA_ParseUrlStr_1[0],"/">,["youtubei",...any]>,
		Extract<T_SplitOnce<GA_ParseUrlStr_1[0],"/">,[any,any]>,
	];
	export type GA_ParseUrlStr=[
		...GA_ParseUrlStr_2,
		GA_ParseUrlStr_2[1][1],
		Extract<T_SplitOnce<Extract<GA_ParseUrlStr_2[1][1],`${string}/${string}`>,"/">[1],`${string}/${string}`>,
	];
	export type ParseUrlStr_1=T_SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1];
	export type ParseUrlStr_2=Extract<T_SplitOnce<ParseUrlStr_1,"/">,["youtubei",...any]>;
	export type ParseUrlStr_3=Extract<T_SplitOnce<ParseUrlStr_1,"/">,[any,any]>;
	export type ParseUrlStr_4=ParseUrlStr_2[1];
	export type ParseUrlStr_5=Extract<T_SplitOnce<Extract<ParseUrlStr_2[1],`${string}/${string}`>,"/">[1],`${string}/${string}`>;
}
type DP_ParseUrlStr_1=NS_DP_Parse.ParseUrlStr_1;