// SafeFunctionPrototype
export type SafeFunctionPrototype={
	apply: (this: () => void,thisArg: unknown,argArray?: unknown) => unknown;
	bind: (this: () => void,thisArg: unknown,...argArray: unknown[]) => unknown;
	call: (this: () => void,thisArg: unknown,...argArray: unknown[]) => unknown;
};
