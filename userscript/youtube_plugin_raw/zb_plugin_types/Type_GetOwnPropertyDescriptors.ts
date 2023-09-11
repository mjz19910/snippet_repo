export type Type_GetOwnPropertyDescriptors<T>={
	[P in keyof T]: TypedPropertyDescriptor<T[P]>;
};
