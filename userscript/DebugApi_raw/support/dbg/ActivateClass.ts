import {Constructor} from "../types/Constructor.js";

export type ActivateClass={
	type: "class-breakpoint";
	name: string;
	target: Constructor;
	activate: (fn_val: Constructor,args: any[]) => any;
	activate_args: any[];
};
