import {T_Split} from "../../support_0_mod/T_Split.mod.js";
import {Decay} from "../../support_1/parse_url/Decay.js";
import {D_UrlFormat,D_CompactVideo} from "../d/group_D.js";
import {T_DistributedKeyof,T_SplitOnce} from "../stu/mod/group_T.js";

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
namespace NS_DD_CompactVideoTest {
	type SM1="videoId,thumbnail,title,longBylineText,publishedTimeText,viewCountText,lengthText,navigationEndpoint,shortBylineText";
	type CT="channelThumbnail";
	type ED1="trackingParams,shortViewCountText,menu,thumbnailOverlays,accessibility,richThumbnail";
	type BaseKeysStr=/*!*/`${SM1},${CT},${ED1}`;
	type U2=T_Split<BaseKeysStr>[number];
	export type T2=Extract<D_CompactVideo,{lengthText: any;}>[U2];
	type S3=/*!*/`${SM1},badges,${CT},${ED1}`;
	export type T3=Extract<D_CompactVideo,{lengthText: any; badges: any;}>[T_Split<S3>[number]];
}
namespace NS_NumRange {
	export type NextMakeNum_3<U extends any[],T>=T extends 0? 1:[any,...U]['length'] extends T? [any,any,...U]['length']:NextMakeNum_3<[any,...U],T>;
	type NumRange_1<T,E>=T extends E? T:NextMakeNum_3<[],T> extends E? E:T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;
	export type NumRange<T,E>=T extends E? T:T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;
	type NextMakeNum_2<T>=T extends `${infer C extends number}`? `-${NS_NumRange.NextMakeNum_3<[],C>}` extends `${infer V extends number}`? V:never:never;
	type NextMakeNum_1<U extends any[],T>=[any,...U]['length'] extends T? [U,T][0]['length']:NextMakeNum_1<[any,...U],T>;
	type NextMakeNum<T extends number>=[any]["length"] extends T? 0:NextMakeNum_1<[any],T>;
	type MakeNumRange<T extends number>=`${T}` extends `-${infer NotNeg}`? NextMakeNum_2<NotNeg>:[]["length"] extends T? -1:NextMakeNum<T>;
	export type MakeNumRes=MakeNumRange<1>;
	export type MakeNum2=NextMakeNum_2<`5`>;
	export type NumAddRes=NS_NumRange.NextMakeNum_3<[],3>;
	type MR=NumRange<1,8>;
	type MR2=NumRange<2,3>;
	type MR2_1<T,E>=T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;
	type MR2d=MR2_1<2,3>;
	export type CC=`${MR}`;
	export type CC_Arr=[
		`${MR2}`,
		`${MR2d}`,
	];
}
export namespace NS_UnionToPartial {
	type ExtractValueFromUnion<T,U extends keyof T>=Extract<T,Record<U,any>>[U];
	type ExtractUnionCommon<T>={[U in T_DistributedKeyof<T>]: ExtractValueFromUnion<T,U>;};
	type UnionGetPartialPart<T>=Partial<Omit<ExtractUnionCommon<T>,keyof T>>;
	export type UnionToPartial<T>=Decay<Pick<T,keyof T extends string? keyof T:never>&UnionGetPartialPart<T>>;
}
