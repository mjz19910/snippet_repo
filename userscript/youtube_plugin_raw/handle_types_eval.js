import {ServiceMethods} from "./zc_child_modules/YtPlugin_Base_Plugin.user";
/** @returns {never} */
function n() {
	throw new Error("Make never type");
}
/** @template T,U @extends {ServiceMethods<T,U>} */
export class HandleTypesEval_ extends ServiceMethods {
	/** @protected @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {x;}
	/** @protected */
	gk=this.get_keys_of;
	// /** @protected @arg {D_CF_D_Params} cf @template U @template {string} T @arg {{params:T;}} x @arg {(this:this,x:DC_Params['params'],cf:string)=>U} f */
	// D_Params(cf,x,f) {const {params: p,...y}=this.s(`D_CF_D_Params:${cf}`,x); this.g(y); return f.call(this,x.params,cf);}
	/** @protected @arg {string} a @arg {{}} b */
	k=(a,b) => this.save_keys(`[${a}]`,b);
	// /** @protected @template {{}} T @arg {D_CF_s} cf @arg {T} x @returns {T} */
	// s_priv(cf,x) {this.s(cf,x);}
	// /** @protected @template {{}} T @arg {D_CF_s} cf @arg {T} x @returns {T} */
	// s(cf,x) {cf; x; n();}
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {x; f;}
	/** @protected @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x @returns {TD_ItemSection_3<CT, T, U>} */
	TR_ItemSection_3(x) {x; n();}
	/** @protected @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x @returns {TD_ItemSection_2<T, "comments-entry-point">} */
	TR_ItemSection_2(x) {x; n();}
	/** @protected @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	TD_ItemSection_2_CommentsEntryPoint(x,f) {x; f; n();}
	/** @protected @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	T_SecondaryResults(x,f) {x; f;}
	/** @protected @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	T_Playlist(x,f) {x; f;}
	/** @protected @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	T_Autoplay(x,f) {x; f;}
	/** @protected @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	T_Types(x,_x=null) {x; n();}
	// /** @protected @template U @template {T_DistributedKeyof<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>U} f @returns {U} */
	// H_(cf,x,f) {cf; x; f; n();}
	/** @protected @arg {G_Text} x */
	G_Text(x) {x;}
}
