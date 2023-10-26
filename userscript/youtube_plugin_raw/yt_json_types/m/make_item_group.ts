import {DStr_DI_AKLMZ} from "../d/mod_D/DI_T/DI_T_move.ts";
import {T_GetTypeof} from "../stu/group_T.ts";

export type G_MakeGroupShape<T,L extends "one"|"arr"|"many"|"typeof_name"|"instance_name"="one",M=string>={
	a: DStr_DI_AKLMZ; k: "item"; l: L; m: M; z: [T];
};
export type make_one_t<T>=G_MakeGroupShape<T,"one">;
export type make_arr_t<T>=G_MakeGroupShape<T[],"arr">;
export type make_many_t<T>=G_MakeGroupShape<T[][],"many">;
export type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>=G_MakeGroupShape<U,"typeof_name">;
export type make_instance_name_t<V extends string>=G_MakeGroupShape<V,"instance_name">;
export type make_item_group<T>=
	|make_one_t<T>
	|make_arr_t<T>
	|make_many_t<T>
	|make_typeof_name_t<T>
	|make_instance_name_t<"array">
	;
;
