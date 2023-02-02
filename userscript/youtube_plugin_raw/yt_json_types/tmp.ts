// empty
type T_ParseCallbackFunction<T extends CF_L_Params>=(
	x: V_ParamMapValue[],idx: number,
	path: P_ParamParse_XX,map_keys: number[],
	root: T,
) => void;
type D_ParamObjType={
	[x: number]: number|string|D_ParamObjType;
};
