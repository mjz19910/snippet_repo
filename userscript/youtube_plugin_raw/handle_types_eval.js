import {ServiceMethods} from "./youtube_plugin.user";
/** @template T,U @extends {ServiceMethods<T,U>} */
export class HandleTypesEval_ extends ServiceMethods {
	/** @protected @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {
		x;
	}
	/** @protected */
	gk=this.get_keys_of;
	/** @protected @arg {string} cf @template U @template {string} T @arg {{params:T;}} x @arg {(this:this,x:D_Params['params'],cf:string)=>U} f */
	D_Params(cf,x,f) {const {params: p,...y}=this.sd(cf,x); this.g(y); return f.call(this,x.params,cf);}
	/** @protected @arg {string} a @arg {{}} b */
	k=(a,b) => this.save_keys(`[${a}]`,b);
	/** @protected @template {{}} T @arg {string} cf @arg {T} x */
	sd(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
}
