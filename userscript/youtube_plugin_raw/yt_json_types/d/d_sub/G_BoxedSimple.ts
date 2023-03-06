type DSS_Bigint=DSI_Item_ABD<bigint,"bigint">;
type DSS_Boolean=DSI_Item_ABD<boolean,"boolean">;
type DSS_Keys=DSI_Item_ABD<number|string,"keys">;
type DSS_Number=DSI_Item_ABD<number,"number">;
type DSS_String=DSI_Item_ABD<string,"string">;
type DSS_VE=DSI_Item_ABD<number,"root_visual_element">;
type GST_DSS=
	|DSS_Bigint
	|DSS_Boolean
	|DSS_Keys
	|DSS_Number
	|DSS_String
	|DSS_VE
	;
;
