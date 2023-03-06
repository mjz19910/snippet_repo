type T_IdBox<SV extends G_IdSrc,T_IdType extends string,T extends SV["key_type"]=SV["key_type"],V=SV["type"]>={
	key: `boxed_id:${T}:${T_IdType}`;
	base: "boxed_id";
	type: T;
	id: T_IdType;
	z: [make_item_group<V>];
};
