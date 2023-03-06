type T_BoxedStore<T,T_Type extends string>={
	type: "boxed_id";
	tag: T_Type;
	key: `boxed_id:${T_Type}:${string}`;
	z: [{
		type: "store",
		tag: string;
		z: [make_item_group<T>];
	}];
};
type T_BoxedStore_3<T,T_Type extends string,T_Tag2 extends string>={
	type: "boxed_id";
	tag: T_Type;
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	z: [{
		type: "store",
		tag: T_Tag2;
		z: [make_item_group<T>];
	}];
};
