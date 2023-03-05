type DIT_Prim<T>={
	_is: "primitive";
	type: StoreGetType<T>;
	info_arr: [string];
};
