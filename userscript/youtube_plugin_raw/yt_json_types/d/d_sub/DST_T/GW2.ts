export type GW2<T>=T extends {
	z: [T_DI_FromObj<infer J extends {
		[U in string]: any;
	}>];
}? keyof J:never;
