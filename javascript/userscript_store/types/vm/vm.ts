import {Unboxed} from "./SimpleVMTypes";

export type NewableFunction = {
	new(...a: Unboxed[]): Unboxed;
};
export type Function = (...a: Unboxed[]) => Unboxed;
export type Indexed<T> = {
	[v: string]: T;
};