import {FunctionLike} from "../types/FunctionLike.ts";

export type I_debug={
	_bad: true;
	(fn: FunctionLike,code: string): void;
};
