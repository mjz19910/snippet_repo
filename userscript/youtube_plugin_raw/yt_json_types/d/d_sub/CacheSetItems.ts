type CacheSetItems=
	|make_item_group<bigint>|G_BoxedIdObj|G_BoxedIdObj["info_arr"][0]
	|make_item_group<boolean>
	|make_item_group<string|number>
	|make_item_group<number>
	|make_item_group<string>
	|{type: "store"; z: [make_item_group<bigint>];}
	;
;
