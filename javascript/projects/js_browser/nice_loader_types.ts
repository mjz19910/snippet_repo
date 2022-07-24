type ContextType={
	conditions: string[]
	importAssertions: {}
	parentURL: string
}
export type ResolveFn=(arg0: string,arg1: ContextType,arg2: ResolveFn) => any
