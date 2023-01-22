type MetadataBadgeData={
	icon: T$Icon<"CHECK_CIRCLE_THICK">;
	style: "BADGE_STYLE_TYPE_VERIFIED";
	tooltip: string;
	trackingParams: string;
	accessibilityData: A$LabelData;
};
type NextMakeNum_2<T>=T extends `${infer C extends number}`?`-${NextMakeNum_3<[],C>}` extends `${infer V extends number}`?V:never:never;
type NextMakeNum_3<U extends any[],T>=[any,...U]['length'] extends T?[any,any,...U]['length']:NextMakeNum_3<[any,...U],T>;
type NextMakeNum_1<U extends any[],T>=[any,...U]['length'] extends T?[U,T][0]['length']:NextMakeNum_1<[any,...U],T>;
type NextMakeNum<T extends number>=[any]["length"] extends T?0:NextMakeNum_1<[any],T>;
type MakeNumRange<T extends number>=`${T}` extends `-${infer NotNeg}`?NextMakeNum_2<NotNeg>:[]["length"] extends T?-1:NextMakeNum<T>;
type MakeNumRes=MakeNumRange<1>;
type MakeNum2=NextMakeNum_2<`1`>;
type NumRange_1<T,E>=NextMakeNum_3<[],T> extends E?E:T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;
type NumRange<T,E>=T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;
type NumAddRes=NextMakeNum_3<[],3>;
type MR=NumRange<1,8>;
type CC=`${MR}`;