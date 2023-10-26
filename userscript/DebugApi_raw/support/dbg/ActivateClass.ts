import {Constructor} from "../types/Constructor.ts";

export type ActivateClass={
	type: "class-breakpoint";
	name: string;
	target: Constructor;
	activate: (fn_val: Constructor,args: unknown[]) => unknown;
	activate_args: unknown[];
};
