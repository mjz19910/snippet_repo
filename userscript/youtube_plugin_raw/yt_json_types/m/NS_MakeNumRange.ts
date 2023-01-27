namespace NS_MakeNumRange {
	type NextMakeNum_2<T>=T extends `${infer C extends number}`? `-${NS_MakeNumRange.NextMakeNum_3<[],C>}` extends `${infer V extends number}`? V:never:never;
	type NextMakeNum_1<U extends any[],T>=[any,...U]['length'] extends T? [U,T][0]['length']:NextMakeNum_1<[any,...U],T>;
	type NextMakeNum<T extends number>=[any]["length"] extends T? 0:NextMakeNum_1<[any],T>;
	type MakeNumRange<T extends number>=`${T}` extends `-${infer NotNeg}`? NextMakeNum_2<NotNeg>:[]["length"] extends T? -1:NextMakeNum<T>;
	export type MakeNumRes=MakeNumRange<1>;
	export type MakeNum2=NextMakeNum_2<`5`>;
	export type NumAddRes=NS_MakeNumRange.NextMakeNum_3<[],3>;
	type MR=NumRange<1,8>;
	export type CC=`${MR}`;
}
