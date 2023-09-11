export type ActivateClass={
	type: "class-breakpoint";
	name: string;
	target: Function;
	activate: (fn_val: Function,args: any[]) => any;
	activate_args: any[];
};
