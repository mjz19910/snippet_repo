type G_CacheSetItems=
	|make_item_group<bigint>|G_BoxedDatabaseData|G_BoxedDatabaseData["z"][0]
	|make_item_group<boolean>
	|make_item_group<string|number>
	|make_item_group<number>
	|make_item_group<string>
	|{type: "store"; z: [make_item_group<bigint>];}
	;
;
type CacheTreeDepth1=G_BoxedDatabaseData["z"][0];
