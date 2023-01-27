namespace NS_DP_Parse {
	type GA_ParseUrlStr_1=[T_SplitOnce<Exclude<D_UrlFormat,"/">,"/">[1]];
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
	export type ParseUrlStr_0=GA_ParseUrlStr[0];
	export type ParseUrlStr_1=GA_ParseUrlStr[1];
	export type ParseUrlStr_2=GA_ParseUrlStr[2];
	export type ParseUrlStr_3=GA_ParseUrlStr[3];
	export type ParseUrlStr_4=GA_ParseUrlStr[4];
	export type ParseApiUrlStr=T_SplitOnce<Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["api",...any]>[1],"/">[1];
}
