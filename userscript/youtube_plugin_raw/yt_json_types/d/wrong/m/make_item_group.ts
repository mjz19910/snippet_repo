type make_one_t<T>={
	a: "/GV/b/c/f/z"; b: "item"; c: "one"; f: string;
	z: [T];
};
type make_arr_t<T>={
	a: "GV/b/c/f/z"; b: "item"; c: "arr"; f: string;
	z: [T[]];
};
type make_many_t<T>={
	a: "GV/b/c/f/z"; b: "item"; c: "many"; f: string;
	z: [T[][]];
};
type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>={
	a: "GV/b/c/f/z"; b: "item"; c: "typeof_name"; f: string;
	z: [U];
};
type make_instance_name_t<V extends string>={
	a: "GV/b/c/f/z"; b: "item"; c: "instance_name"; f: string;
	z: [V];
};

type make_item_group<T>=
	|make_one_t<T>
	|make_arr_t<T>
	|make_many_t<T>
	|make_typeof_name_t<T>
	|make_instance_name_t<"array">
	;
;
