
// gen_3
type gen_g3_t2t1<T,U extends any[]>=gen_g3_t2<T,gen_g3_t2<"n",U>>;
// gen_3_arr
type gen_g3_raw<T,U>=["gen_3",T,["raw",U]];
// gen_3
type gen_g3_or<T,U>=["gen_3",T,["or",U]];
// gen_3_gen_2_raw
type gen_g3_a3<T,U,V>=["gen_3",T,["gen2",U,V]];
type seq_t3<T,U,V>=["seq",T,U,V];
type gen_a3_t2<T extends [string,string],U,V extends [string,string]>=[["seq",T[0],U,V[0]],["seq",T[1],U,V[1]]];
type gen_a2_t2<T,U extends [string,string]>=[["seq",T,U[0]],["seq",T,U[1]]];
//#region used
// gen_2_raw
type gen_g2_t1<T>=["gen_2",["raw",T]];
// gen_3_arr
type gen_g3_t2<U,T extends any[]>=["gen_3",U,["arr",T]];
//#endregion

