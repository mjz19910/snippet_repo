import {FunctionLike} from "../types/FunctionLike.ts";
export interface I_debug {
	(fn: FunctionLike,code: string): void;
}