import {Unboxed} from "./Unboxed";


export type NewableFunction = {
	new(...a: Unboxed[]): Unboxed;
};
