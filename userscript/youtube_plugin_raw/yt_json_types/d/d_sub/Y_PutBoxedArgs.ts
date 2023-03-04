type Y_PutBoxedArgs=
	|["bigint",string,make_item_group<bigint>]
	|["load_id"|"save_id",number]
	|["root_visual_element"|"number",string,make_item_group<number>]
	|["string",string,make_item_group<string>]
	|["keys",string,make_item_group<string|number>]
	|["boolean",string,make_item_group<boolean>]
	|MakeInfoBoxArgs<G_UrlInfo>
	|[G_RawUrlInfo_1['type_parts'][1],G_RawUrlInfo_1]
	|[G_RawUrlInfo_1['type_parts'][1],G_RawUrlInfo_1]
	;
;
type MakeInfoBoxArgs<T extends {type: any;}>=T extends infer R extends T? [R["type"],R]:never;
