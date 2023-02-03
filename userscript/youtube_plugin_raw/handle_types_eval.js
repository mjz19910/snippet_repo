import {ServiceMethods} from "./zc_child_modules/YTPlugin_Base_Plugin.user";
import {TypedefGenerator} from "./zc_child_modules/YTPlugin_HandleTypes_Service.user";
/** @returns {never} */
function n() {throw new Error("Make never type");}
n;
/** @template T,U @extends {ServiceMethods<T,U>} */
export class HandleTypesEval_ extends ServiceMethods {
	/** @type {TypedefGenerator} */
	get generate_typedef() {
		throw new Error();
	}
	/** @template {"DE_VE3832_Watch"} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root */
	on_player_params_callback(map_entry_values,map_entry_key_path,path,map_keys,root) {
		map_entry_values; map_entry_key_path; path; map_keys; root;
	}
	/** @template {CF_L_Params} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root @returns {void} */
	on_endpoint_params_callback(map_entry_values,map_entry_key_path,path,map_keys,root) {
		map_entry_values; map_entry_key_path; path; map_keys; root;
	}
	/** @protected @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
	parse_param_next(root,path,map_entry_key_path,tva,callback) {
		root; path; map_entry_key_path; tva; callback;
	}
	/** @protected @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {x;}
	/** @protected @arg {D_YtConfig} x */
	D_YtConfig(x) {x;}
	/** @protected */
	gk=this.get_keys_of;
	// /** @protected @arg {D_CF_D_Params} cf @template U @template {string} T @arg {{params:T;}} x @arg {(this:this,x:DC_Params['params'],cf:string)=>U} f */
	// D_Params(cf,x,f) {const {params: p,...y}=this.s(`D_CF_D_Params:${cf}`,x); this.g(y); return f.call(this,x.params,cf);}
	// /** @protected @template {{}} T @arg {D_CF_s} cf @arg {T} x @returns {T} */
	// s_priv(cf,x) {this.s(cf,x);}
	// /** @protected @template {{}} T @arg {D_CF_s} cf @arg {T} x @returns {T} */
	// s(cf,x) {cf; x; n();}
	// /** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	// T_Command_TP(x,f) {x; f;}
	// /** @protected @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x @returns {TD_ItemSection_3<CT, T, U>} */
	// TR_ItemSection_3(x) {x; n();}
	// /** @protected @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x @returns {TD_ItemSection_2<T, "comments-entry-point">} */
	// TR_ItemSection_2(x) {x; n();}
	// /** @protected @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	// TD_ItemSection_2_CommentsEntryPoint(x,f) {x; f; n();}
	// /** @protected @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	// T_SecondaryResults(x,f) {x; f;}
	// /** @protected @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	// T_Playlist(x,f) {x; f;}
	// /** @protected @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	// T_Autoplay(x,f) {x; f;}
	// /** @protected @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	// T_Types(x,_x=null) {x; n();}
	// /** @protected @template U @template {T_DistributedKeyof<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>U} f @returns {U} */
	// H_(cf,x,f) {cf; x; f; n();}
	// /** @protected @arg {G_Text} x */
	// G_Text(x) {x;}
}
