import {Constructor} from "../types/Constructor.ts";
export interface I_undebug {
	(fn: Constructor|CallableFunction|((...x: unknown[]) => unknown)): void;
}