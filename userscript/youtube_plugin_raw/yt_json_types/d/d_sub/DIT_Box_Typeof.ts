type DIT_Box_Typeof<T>={
	a: "primitive";
	//  ^ is
	// {e:StoreGetType<T>}["e"]
	e: T_StoreTypeFromT<T>;
	//  ^ primitive typeof
	z: [T];
};
