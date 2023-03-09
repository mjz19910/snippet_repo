export type GW1<T,K extends string>=T extends {
	z: [T_DI_FromObj<{
		[U in K]: infer W;
	}>];
}? W:never;
