type DIT_Box_Typeof<T>={
	a: "primitive";
	//  ^ is
	// {e:StoreGetType<T>}["e"]
	e: StoreGetType<T>;
	//  ^ primitive typeof
	z: [T];
};
