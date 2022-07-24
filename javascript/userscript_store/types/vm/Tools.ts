import {TypeManipulation} from "./tools/TypeManipulation"
type ReturnValueI<T> = T extends (...a: any[]) => infer U ? U : never
export type IntIntLim<T extends number, LIM extends number, U extends 0[]>=
T extends LIM ? never :
U['length'] extends LIM ? never :
[][T] extends never ? never :
T extends U['length'] ? [0, ...U] :
IntIntLim<T, LIM, [0, ...U]>
export type IntArrOfLen<T extends number, LIM extends number, U extends 0[]>=
T extends LIM ? never :
U['length'] extends LIM ? never :
[][T] extends never ? never :
T extends U['length'] ? U :
IntIntLim<T, LIM, [0, ...U]>
export type IntMul2<T extends number> = [...IntIntLim<T,5,[]>, ...IntIntLim<T,5,[]>]
export namespace Tests {
	export type ReturnValue<T> = ReturnValueI<T>
	export type ReturnValueTS<T extends (...args: any) => any> = ReturnType<T>
	export type IAz=TypeManipulation.IntInc<12, []>
	export type T1=[...IntIntLim<3,5,[]>, ...IntIntLim<3,5,[]>]['length']
	export type T2=IntMul2<4>['length']
}
