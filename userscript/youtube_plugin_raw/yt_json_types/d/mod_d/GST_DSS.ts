type DSS_Bigint=DSI_T_Item_ABD<"bigint",bigint>;
type DSS_Boolean=DSI_T_Item_ABD<"boolean",boolean>;
type DSS_Keys=DSI_T_Item_ABD<"keys",number|string>;
type DSS_Number=DSI_T_Item_ABD<"number",number>;
type DSS_String=DSI_T_Item_ABD<"string",string>;
type DSS_VE=DSI_T_Item_ABD<"root_visual_element",number>;
type GST_DSS=
	|DSS_Bigint
	|DSS_Boolean
	|DSS_Keys
	|DSS_Number
	|DSS_String
	|DSS_VE
	;
;