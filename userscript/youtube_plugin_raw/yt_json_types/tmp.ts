// empty
type T_ParseCallbackFunction<T extends CF_L_Params>=(
	x: V_ParamMapValue[],idx: number,
	path: P_ParamParse_XX,map_keys: number[],
	root: T,
) => void;
type D_ParamObjType={
	[x: number]: number|string|D_ParamObjType;
};
/** 
 * @template {CF_L_Params} T @arg {on_player_params_callback_ty_len1} x
 * @arg {[8]} map_entry_key 
 * @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse_XX} path @arg {number[]} map_keys @arg {T} root */
type on_player_params_callback_ty_len1<T extends CF_L_Params,U extends P_ParamParse_XX>=[
	root:T,
	path:U,
	map_entry_key:[8],
	map_entry_values:V_ParamMapValue[],
	map_keys:number[],
];