import {CF_P_ParamParse} from "../nop_q/P_LogItems.js";
import {CF_L_Params} from "./group_C.js";

export type ARG_on_player_params_callback_ty_len1<T extends CF_L_Params,U extends CF_P_ParamParse>=[
	root: T,
	path: U,
	map_entry_key:
	|[8]
	|[9]
	|[12]
	|[25]
	|[40]
	|[40,1]
	|[40,1,2]
	|[40,1,3]
	,
	map_entry_values: V_ParamMapValue[],
	map_keys: number[],
];
export type ARG_PathFor_PlayerParams=
	|"watch.player_params"
	|"watch.player_params.f8"
	|"watch.player_params.f9"
	|"watch.player_params.f12"
	|"watch.player_params.f25"
	|"watch.player_params.f40.f1.f2"
	|"watch.player_params.f40.f1.f3"
	|"watch.player_params.f40.f1"
	|"watch.player_params.f40"
	;
;