export type Decay<T> = {
	[U in keyof T]: T[U];
} | {};
