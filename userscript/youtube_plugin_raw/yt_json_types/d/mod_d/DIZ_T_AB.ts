type DIZ_Item_AB<T_Tag2 extends string,T>={
	a: "group"; b: T_Tag2;
	z: [make_item_group<T>];
};
