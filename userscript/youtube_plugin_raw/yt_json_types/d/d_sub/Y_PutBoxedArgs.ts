type Y_PutBoxedArgs=
	|["bigint",string,make_item_group<bigint>]
	|["load_id"|"save_id",number]
	|["root_visual_element"|"number",string,make_item_group<number>]
	|["string",string,make_item_group<string>]
	|["keys",string,make_item_group<string|number>]
	|["boolean",string,make_item_group<boolean>]
	|MakeInfoBoxArgs<G_UrlInfo>
	;
;
type MakeInfoBoxArgs<T extends {type: any;}>=T extends infer R extends T? [R["type"],R]:never;
type MakeRawInfoBoxArgs<T extends G_RawUrlInfo>=
	T extends infer R extends T?
	R["type_parts"] extends infer A extends R["type_parts"]?
	A extends ["raw",...infer A2]?
	[...A2,R]
	:never
	:never
	:never
	;
;
