type Ret_w_diz<T,T_Box extends KV_T_AKZ<string,make_item_group<T>>=KV_T_AKZ<string,make_item_group<T>>>=
	["one",["1",T],T_Box['z'][0],T_Box]|
	["arr",["2",T[]],T_Box['z'][0],T_Box]|
	["many",["3",T[][]],T_Box['z'][0],T_Box]|
	["typeof_name",["t",T_GetTypeof<T>],T_Box['z'][0],T_Box]|
	["instance_name",["i","array"],T_Box['z'][0],T_Box]
	;
;
// DSI_T_Item_ABD<string,T>
