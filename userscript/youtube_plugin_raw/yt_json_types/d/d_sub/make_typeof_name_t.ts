type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>={
	a: "item"; b: "one"; c: "typeof_name";
	z: [U];
};
