type DIT_Box_Typeof2<T_Type extends T_StoreTypeFromT<U>,U>={
	a: "primitive";
	// ^ a = is
	e: T_Type;
	// ^ e = type
	z: [U];
	// ^ z = info_arr
};
