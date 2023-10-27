// SafeFunctionPrototype
export type SafeFunctionPrototype={
	apply: (this: (...a: unknown[]) => void,thisArg: unknown,argArray?: unknown) => unknown;
	bind: (this: (...a: unknown[]) => void,thisArg: unknown,...argArray: unknown[]) => unknown;
	call: (this: (...a: unknown[]) => void,thisArg: unknown,...argArray: unknown[]) => unknown;
};
