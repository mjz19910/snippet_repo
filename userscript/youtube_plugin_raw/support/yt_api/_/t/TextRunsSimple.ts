export type TextRunsSimple={runs: {text: string;}[];};
export type TextRunsSimpleT<T extends string>={runs: [{text: T;}];};
