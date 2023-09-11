import {FunctionLike} from "../types/FunctionLike.js";

export type I_debug={
	_bad: true;
	(fn: FunctionLike,code: string): void;
};
