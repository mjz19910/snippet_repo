type ContextType={
	conditions: string[]
	importAssertions: {}
	parentURL: string
}

export type ResolveFn<T>=(arg0: string,arg1: ContextType,arg2: ResolveFn<T>) => any
declare global {
	interface CC {}
}
