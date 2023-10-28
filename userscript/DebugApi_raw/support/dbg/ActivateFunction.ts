export type ActivateFunction={
	type: "function-breakpoint";
	name: string;
	target: CallableFunction;
	activate: (fn_val: CallableFunction,thisArg: unknown,args: unknown[]) => unknown;
	activate_this: unknown;
	activate_args: unknown[];
};
