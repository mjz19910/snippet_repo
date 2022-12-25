export type ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {
	[V in U]: C;
}:T;
