//#region Imported
type T_DistributedKeyof<T> = T extends infer A ? keyof A : never;
type T_DistributedKeysOf<T extends {}> = T_DistributedKeyof<T> extends never ? [] : T_DistributedKeyof<T>[];

namespace NS_NumRange {
	export type NextMakeNum_3<U extends any[], T> = [any, ...U]['length'] extends T ? [any, any, ...U]['length'] : NextMakeNum_3<[any, ...U], T>;
	type NumRange_1<T, E> = T extends E ? T : NextMakeNum_3<[], T> extends E ? E : T | NextMakeNum_3<[], T> | NumRange_1<NextMakeNum_3<[], T>, E>;
	export type NumRange<T, E> = T extends E ? T : T | NextMakeNum_3<[], T> | NumRange_1<NextMakeNum_3<[], T>, E>;
	type NextMakeNum_2<T> = T extends `${infer C extends number}` ? `-${NS_NumRange.NextMakeNum_3<[], C>}` extends `${infer V extends number}` ? V : never : never;
	type NextMakeNum_1<U extends any[], T> = [any, ...U]['length'] extends T ? [U, T][0]['length'] : NextMakeNum_1<[any, ...U], T>;
	type NextMakeNum<T extends number> = [any]["length"] extends T ? 0 : NextMakeNum_1<[any], T>;
	type MakeNumRange<T extends number> = `${T}` extends `-${infer NotNeg}` ? NextMakeNum_2<NotNeg> : []["length"] extends T ? -1 : NextMakeNum<T>;
	export type MakeNumRes = MakeNumRange<1>;
	export type MakeNum2 = NextMakeNum_2<`5`>;
	export type NumAddRes = NS_NumRange.NextMakeNum_3<[], 3>;
	type MR = NumRange<1, 8>;
	type MR2 = NumRange<2, 3>;
	type MR2_1<T, E> = T | NextMakeNum_3<[], T> | NumRange_1<NextMakeNum_3<[], T>, E>;
	type MR2d = MR2_1<2, 3>;
	export type CC = `${MR}`;
	export type CC_Arr = [
		`${MR2}`,
		`${MR2d}`,
	];
}
type NumRange<T, E> = NS_NumRange.NumRange<T, E>;
//#endregion
