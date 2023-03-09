export type UB_Prim<T extends {z: [any];} extends {
	z: [T_DI_FromObj<{
		[U in string]: any;
	}>];
}? {}:never>=T extends {z: [T_DI_FromObj<infer A>];}? A[keyof A]:never;
