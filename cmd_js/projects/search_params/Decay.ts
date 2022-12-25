export type Decay<T>=Extract<{
	[U in keyof T]: T[U];
}|{},{
	[U in keyof T]: T[U];
}>;
