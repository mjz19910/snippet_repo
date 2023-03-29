type ContextType={
<<<<<<< HEAD
	conditions: string[];
	importAssertions: {
		[U in keyof unknown]: unknown
	};
	parentURL: string;
};
export type ResolveFn=(arg0: string,arg1: ContextType,arg2: ResolveFn) => unknown;
=======
	conditions: string[]
	importAssertions: {}
	parentURL: string
}
export type ResolveFn=(arg0: string,arg1: ContextType,arg2: ResolveFn) => any
>>>>>>> e3cfe488b (u)
