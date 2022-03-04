import {TypeManipulation} from "./tools/TypeManipulation";

type ReturnValue<T> = ReturnValueI<T>;
type ReturnValueI<T> = T extends (...a: any[]) => infer U ? U : never;
type ReturnValueTS<T extends (...args: any) => any> = ReturnType<T>;
type Arr1=[1,2,3];
type Arr2=[1,2,3,4];
var x:Arr1|Arr2=[1,2,3,4];x[x['2']];
type IntInc<T extends number> = TypeManipulation.IntInc<T>;
type IAz=IntInc<12>;
export {IntInc};
