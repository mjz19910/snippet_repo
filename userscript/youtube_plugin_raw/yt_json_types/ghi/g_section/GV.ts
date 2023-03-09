//#region used
// gen_2_raw
type GV_gen_g2_t1<T>=["gen_2",["raw",T]];
// gen_3_arr
type GV_gen_g3_t2<U,T extends any[]>=["gen_3",U,["arr",T]];
// gen_3_arr
type GV_gen_g3_raw<T,U>=["gen_3",T,["raw",U]];
type GV_gen_a2_t2<T,U extends [string,string]>=[["seq",T,U[0]],["seq",T,U[1]]];
type GV_gen_a3_t2<T extends [string,string],U,V extends [string,string]>=[["seq",T[0],U,V[0]],["seq",T[1],U,V[1]]];
//#endregion
//#region unused
type GV_gen_g3_t2t1<T,U extends any[]>=GV_gen_g3_t2<T,GV_gen_g3_t2<"n",U>>;
type GV_gen_g3_or<T,U>=["gen_3",T,["or",U]];
type GV_gen_g3_a3<T,U,V>=["gen_3",T,["gen2",U,V]];
type GV_seq_t3<T,U,V>=["seq",T,U,V];
//#endregion
