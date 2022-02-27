import {Unboxed} from "./Unboxed";

export type NewableFunction = {
	new(...a: Unboxed[]): Unboxed;
};
export type Function = (...a: Unboxed[]) => Unboxed;
export type Indexed<T> = {
	[v: string]: T;
};