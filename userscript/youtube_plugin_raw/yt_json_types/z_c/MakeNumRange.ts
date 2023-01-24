namespace MakeNumRange {
	export type NextMakeNum_3<U extends any[],T>=[any,...U]['length'] extends T? [any,any,...U]['length']:NextMakeNum_3<[any,...U],T>;
	type NumRange_1<T,E>=NextMakeNum_3<[],T> extends E? E:T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;
	export type NumRange<T,E>=T|NextMakeNum_3<[],T>|NumRange_1<NextMakeNum_3<[],T>,E>;

}
