export declare namespace TypeManipulation {
	/*
	 type IntIncImpl<T extends number, U extends 1[]>=
		// check for number less than 0, access an array, this will verify
		// we have a positive or zero value
		[][T] extends never ?
		// is T -1
		T extends -1 ?
		//return 0
		0 :
		//TODO: get to a positive number
		never :
		// is the value we are at equal to the accumulator array
		T extends U['length'] ?
		// we got to the accumulator length eq T, we found the value the user passed,
		// now add 1 to it
		[1, ...U]['length'] :
		// recurse with a longer array
		IntIncImpl<T, [1, ...U]>; 
	 */
	type IntIncImplSkip1000<U extends 1[], Z>=Z extends [] ? [...U, ...U] :
	Z extends [any, ...infer A] ? IntIncImplSkip1000<[...U, ...U], A> : never;
	type Z1=IntIncImplSkip1000<[], [1,1]>['length'];
	export type IntInc<T extends number, U extends void[]>=
		U['length'] extends 16 ? never :
		// check for number less than 0, access an array, this will verify
		// we have a positive or zero value
		[][T] extends never ?
		//TODO: get to a positive number
		never :
		// is the value we are at equal to the accumulator array
		T extends U['length'] ?
		// we got to the accumulator length eq T, we found the value the user passed,
		// now add 1 to it
		[void, ...U]['length'] :
		// recurse with a longer array
		IntInc<T, [void, ...U]>;
	/* type IntDecImpl<T extends number, U extends 1[]>=[][T] extends never ? -1 : T extends U['length'] ? U extends [1,  ...infer C] ? C['length'] : T : IntDecImpl<T, [1, ...U]>;
	type IntDec<T extends number>=IntDecImpl<T, []>;
	type NegDec<T extends number>=Extract<[null, undefined][T], undefined> extends null ? -1:
	[null][T] extends null ? T extends -2 ? -3 : ['e', T]
	: T extends 1 ? 0 : IntDec<T>; */
	type IAz=IntInc<12, []>;
	/* type IA1=IntInc<1>;
	type IA2=IntInc<2>;
	type IA4=IntInc<4>;
	type IS1=IntDec<0>;
	type IS2=IntDec<1>; */
	/*
	// too much instantiation
	type ExtractIntImpl<T extends number, U extends number, C extends number, Z extends number[]> =
	U extends 8 ? [T] :
	Exclude<T, Z[number]> extends never ? Z :
	Extract<T, Z[number]> extends never ? ExtractIntImpl<T, IntInc<U>, C, [IntInc<Z[0]>]> :
	[Extract<T, Z[number]>, ...ExtractIntImpl<Exclude<T, Z[number]>, IntInc<U>, C, [Z[0]]>];

	type A1 = ExtractIntImpl<1|2|3|4|5, 1, 1, [1]>;
	type ExtractInt<T extends number, U extends number> = ExtractIntImpl<T, 1, 1, [1]>;
	*/
	/* type Info<T> = T extends infer B ? [Extract<B, 1>, Exclude<T, 1>] : [T, never];
	type In1<T> = Info<T>[1]; */

	// type V1 = Info<1|2>[0];
	// type V2 = Info<2|3|4>;
	// type V3  =In1<1|2|3>;
	// type V4 = NegDec<-1>;
	// type IntNeg4 = -4;
	// type Arr1 = [1, 2];
	/* type NegInc<T extends number>=Extract<[null, undefined][T], undefined> extends null ? -1:
	[null][T] extends null ?
	T extends -1 ?  0 :
	T extends -2 ? -1 :
	T extends -3 ? -2 :
	T extends -4 ? -3 : ['e', T]
	: T extends 1 ? 0 : NegInc<T>;
	type NegIncImpl1<T extends number, U extends (1|0)[]>=U[T] extends 0 ? [T] : U[T] extends never ? NegIncImpl1<T, [1, ...U]> :[][T] extends undefined ? IntInc<T> : ['x', never];
	type NegIncImpl2<T extends number, U extends number[], Z extends number>=U extends [] ? NegIncImpl2<T, [IntInc<Z>, ...U], IntInc<Z>> : U[T] extends 0 ?
	U extends [any,  ...infer C] ? U : 'z':
	U extends [any,  ...infer C] ? U : T;
	type V5 = NegIncImpl1<-2, [0, 1]>;
	type V6 = NegIncImpl2<0, [], 0>; */
	type V1 = `${-11}`;
	type V2<X> = X extends `${string}${infer U}` ? U : X;
	type v3 = V2<V1>;
}