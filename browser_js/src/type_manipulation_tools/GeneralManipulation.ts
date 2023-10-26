import {ArrayManipulation} from "./ArrayManipulation.ts";
import {StringManipulation} from "./StringManipulation.ts";

export declare namespace GeneralManipulation {
	type Reverse<U extends any[]|string>=U extends string? StringManipulation.Reverse<U>:U extends any[]? ArrayManipulation.Reverse<U>:never;
	type GReverse<T>=T extends any[]? ArrayManipulation.Reverse<T>:T extends string? StringManipulation.Reverse<T>:never;

	type RevDataStr=Reverse<"Data">;
	type RevDataArr=Reverse<[1,2,3]>;
}
