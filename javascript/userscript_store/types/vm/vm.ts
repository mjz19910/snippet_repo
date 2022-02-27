import {Unboxed} from "./mod";

export type NewableFunction = {
	new(...a: Unboxed[]): Unboxed;
};
export type Function = (...a: Unboxed[]) => Unboxed;
export type Indexed<T> = {
	[v: string]: T;
};