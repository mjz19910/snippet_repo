type T_IdBox<SV extends G_IdSrc,T_IdType extends string,T extends SV["key_type"]=SV["key_type"],V=SV["type"]>={
	b: "boxed_id"; c: T; d: T_IdType;
	key: `boxed_id:${T}:${T_IdType}`;
	z: [make_item_group<V>];
};
