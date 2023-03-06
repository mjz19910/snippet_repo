type DIT_Prim<T>={
	_is: "primitive";
	type: StoreGetType<T>;
	info_arr: [T];
};
type DIT_Prim2<T extends StoreGetType<U>,U>={
	_is: "primitive";
	type: T;
	info_arr: [U];
};
