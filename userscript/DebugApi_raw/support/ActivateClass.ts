type ActivateClass={
	type: "class-breakpoint";
	name: string;
	target: DbgNewableFn;
	activate: (fn_val: DbgNewableFn,args: any[]) => any;
	activate_args: any[];
};
