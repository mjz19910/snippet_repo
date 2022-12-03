export type SafeFunctionPrototype={
	apply: (this: Function,thisArg: any,argArray?: any) => any;
	bind: (this: Function,thisArg: any,...argArray: any[]) => any;
	call: (this: Function,thisArg: any,...argArray: any[]) => any;
};
