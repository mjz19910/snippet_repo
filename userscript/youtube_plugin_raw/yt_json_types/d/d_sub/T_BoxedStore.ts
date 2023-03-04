type T_BoxedStore<T,T_Type extends string>={
	type: "boxed_id";
	tag: T_Type;
	key: `boxed_id:${T_Type}:${string}`;
	value: T_UrlInfoArr<string,make_item_group<T>>;
};
