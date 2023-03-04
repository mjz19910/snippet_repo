type T_BoxedStore<T,T_Type extends string>={
	key: `boxed_id:${T_Type}:${string}`;
	base: "boxed_id";
	type: T_Type;
	id: string;
	value: make_item_group<T>;
};
