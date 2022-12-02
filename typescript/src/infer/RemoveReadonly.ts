/*
This is part of the lib
type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any
type Required<T> = { [P in keyof T]-?: T[P] }

Exclude<T, U>
Extract<T, U>
NonNullable<T>
ReturnType<T>
InstanceType<T>
*/
export type RemoveReadonly<T>={
	-readonly [P in keyof T]: T[P];
};
