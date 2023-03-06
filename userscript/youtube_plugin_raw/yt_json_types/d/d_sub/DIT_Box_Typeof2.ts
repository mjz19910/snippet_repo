type DIT_Box_Typeof2<T_Type extends StoreGetType<U>,U>={
	a: "primitive";
	//  ^ is @member {a}
	e: T_Type;
	//  ^ type @member {b}
	z: [U];
};
