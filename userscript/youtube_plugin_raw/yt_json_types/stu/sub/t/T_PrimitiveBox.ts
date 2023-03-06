type T_PrimitiveBox<T>={
	a: "primitive";
	// ^ a = is
	e: T_GetPrimitiveTag<T>;
	// ^ e = type_name 
	// * primitive typeof
	z: [T];
	// ^ z = info_arr
};
