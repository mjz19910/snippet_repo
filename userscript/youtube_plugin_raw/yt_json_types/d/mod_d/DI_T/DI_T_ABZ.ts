type DI_T_ABZ<T_Tag2 extends string,T>={
	a: "/di/b/z"; b: T_Tag2;
	z: [make_item_group<T>];
};
