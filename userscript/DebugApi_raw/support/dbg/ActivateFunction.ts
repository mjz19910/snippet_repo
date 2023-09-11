export type ActivateFunction={
	type: "function-breakpoint";
	name: string;
	target: CallableFunction;
	activate: (fn_val: CallableFunction,thisArg: any,args: any[]) => any;
	activate_args: [any,any[]];
};
