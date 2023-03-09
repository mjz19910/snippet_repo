import {T_AO_Z1} from "./T_AO_Z1.js";

export function static_must_compile_test(): 0|1 {
	type T1=T_GP_FromObj<T_AO_Z1<DI_Key_StartRadio>>;
	type T2=T1["start_radio"];
	type T3=keyof T1;
	const t1: T1={start_radio: 0};
	const t2: [T2,DI_Key_StartRadio['c'],T3]=[t1.start_radio,"start_radio","start_radio"];
	return t2[0];
}
export {};
