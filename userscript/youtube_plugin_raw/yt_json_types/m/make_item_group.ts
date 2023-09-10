type G_MakeGroupShape<T,L extends "one"|"arr"|"many"|"typeof_name"|"instance_name"="one",M=string>={
	a: DStr_DI_AKLMZ; k: "item"; l: L; m: M; z: [T];
};
type make_one_t<T>=G_MakeGroupShape<T,"one">;
type make_arr_t<T>=G_MakeGroupShape<T[],"arr">;
type make_many_t<T>=G_MakeGroupShape<T[][],"many">;
type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>=G_MakeGroupShape<U,"typeof_name">;
type make_instance_name_t<V extends string>=G_MakeGroupShape<V,"instance_name">;
export type make_item_group<T>=
	|make_one_t<T>
	|make_arr_t<T>
	|make_many_t<T>
	|make_typeof_name_t<T>
	|make_instance_name_t<"array">
	;
;
