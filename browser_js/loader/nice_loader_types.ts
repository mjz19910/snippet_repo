type ContextType={
	conditions: string[];
	importAssertions: {
		_0: 0;
	};
	parentURL: string;
};
export type ResolveFn=(arg0: string,arg1: ContextType,arg2: ResolveFn) => unknown;
