type CacheSetItems=
	|make_item_group<bigint>|G_BoxedIdObj|G_BoxedIdObj["z"][0]
	|make_item_group<boolean>
	|make_item_group<string|number>
	|make_item_group<number>
	|make_item_group<string>
	|{type: "store"; z: [make_item_group<bigint>];}
	|CacheSetDepth2
	|CacheSetDepth3
	|CacheSetDepth4
	;
;
type CacheSetDepth2=Extract<CacheTreeDepth2,object>;
type CacheSetDepth3=Extract<CacheTreeDepth3,object>;
type CacheSetDepth4=Extract<CacheTreeDepth3,object>;
type CacheTreeDepth1=G_BoxedIdObj["z"][0];
type CacheTreeDepth2=CacheTreeDepth1["z"][0];
type CacheTreeDepth3=Extract<CacheTreeDepth2,object>["z"][0];
type CacheTreeDepth4=Extract<CacheTreeDepth3,{z: any;}>["z"][0];
