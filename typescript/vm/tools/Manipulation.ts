import {ArrayManipulation} from "./ArrayManipulation"
import {StringManipulation} from "./StringManipulation"
export declare namespace Manipulation {
	type Reverse<U extends any[]|string>=U extends string? StringManipulation.Reverse<U>:U extends any[]? ArrayManipulation.Reverse<U>:never
	type GReverse<T>=T extends any[]? ArrayManipulation.Reverse<T>:T extends string? StringManipulation.Reverse<T>:never

	type RevDataStr=Reverse<"Data">
	type RevDataArr=Reverse<[1,2,3]>
}
