export function static_must_compile_test(): 0|1 {
	type T1=T_GP_FromObj<T_AO_Z1<DI_A_StartRadio>>;
	type T2=T1["start_radio"];
	type T3=keyof T1;
	const t1: T1={start_radio: 0};
	const t2: [T2,DI_A_StartRadio['k'],T3]=[t1.start_radio,"key","start_radio"];
	return t2[0];
}
export {};
