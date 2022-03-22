import {TypeManipulation} from "./tools/TypeManipulation";

type ReturnValueI<T> = T extends (...a: any[]) => infer U ? U : never;
type Arr1=[1,2,3];
type Arr2=[1,2,3,4];
var x:Arr1|Arr2=[1,2,3,4];x[x['2']];
//type IntIncImpl<T extends number, U extends void[]>=
// U['length'] extends 16 ? never :
// [][T] extends never ?
//never :
// T extends U['length'] ?
//[void, ...U]['length'] :
// IntIncImpl<T, [void, ...U]>;
export type IntIntLim<T extends number, LIM extends number, U extends void[]> =
[][T] extends never ? never :
T extends U['length'] ? 
[void, ...U]['length'] : IntIntLim<T, LIM, [void , ...U]>;
export namespace Tests {
	export type ReturnValue<T> = ReturnValueI<T>;
	export type ReturnValueTS<T extends (...args: any) => any> = ReturnType<T>;
	export type IAz=TypeManipulation.IntInc<12, []>;
	export type T1=IntIntLim<4,2,[]>;
}
