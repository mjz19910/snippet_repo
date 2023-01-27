type T_ExtractKeyValue<T,U extends string>=T extends {
	[C in U]: any;
}? T:never;
