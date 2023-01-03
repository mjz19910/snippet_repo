type GetKv<T,U extends string>=T extends {
	[C in U]: any;
}? T:never;
