export declare namespace ArrayManipulation {
	export type EmptyType=[];
	export type ExtendType=any[];
	export type First<T extends ExtendType>=T extends [infer U,...ExtendType]? U:EmptyType;
	export type RemoveFirst<T extends ExtendType>=T extends [any,...infer U]? U:EmptyType;
	export type Reverse<U extends ExtendType>=U extends EmptyType? EmptyType:[...Reverse<RemoveFirst<U>>,First<U>];
	export type Last<T extends ExtendType>=First<Reverse<T>>;
	export type RemoveLast<T extends ExtendType>=Reverse<RemoveFirst<Reverse<T>>>;
	export namespace Tests {
		type Data=[1,2,3,4];
		type RevData=Reverse<Data>;
	}
}
