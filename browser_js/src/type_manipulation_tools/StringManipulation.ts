export declare namespace StringManipulation {
	export type First<T extends string>=T extends `${infer U}${string}`? U:'';
	export type RemoveFirst<T extends string>=T extends `${string}${infer U}`? U:'';
	export type Reverse<U extends string>=U extends ''? '':`${Reverse<RemoveFirst<U>>}${First<U>}`;
	export type Last<T extends string>=First<Reverse<T>>;
	export type RemoveLast<T extends string>=Reverse<RemoveFirst<Reverse<T>>>;
	export type Join<T extends string,V extends string>=`${T}${V}`;
	type ToArrayImpl<T extends string,V extends any[]>=T extends ''? V:[First<T>,...ToArrayImpl<RemoveFirst<T>,V>];
	type ToArray<T extends string>=ToArrayImpl<T,[]>;
	export type Count<T extends string>=ToArray<T>['length'];

	namespace Tests {
		type Data="Data";
		type RevData1=Reverse<Data>;
		type DataArr=ToArray<"data">['length'];
	}
}
