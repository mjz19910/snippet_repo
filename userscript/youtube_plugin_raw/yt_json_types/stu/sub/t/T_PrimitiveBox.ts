type T_PrimitiveBox<T>={
	a: "primitive";
	// ^ a = is
	e: T_GetPrimitiveTag<T>;
	// ^ e = type_name 
	// * primitive typeof
	z: [T];
	// ^ z = info_arr
};
type T_PrimitiveBox_E<T,E extends T_GetPrimitiveTag<T>>={
	a: "primitive";
	// ^ a = is
	e: E;
	// ^ e = type_name 
	// * primitive typeof
	z: [T];
	// ^ z = info_arr
};
