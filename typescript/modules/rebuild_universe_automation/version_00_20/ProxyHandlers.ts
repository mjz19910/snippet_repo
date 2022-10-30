import {KeepSome} from "./KeepSome";

export class ProxyHandlers {
	/**
	 * @param {any} root
	 */
	constructor(root) {
		this.weak_root = new WeakRef(root);
		this.count_arr = [0];
	}
	/**
	 * @param {string} type
	 * @param {any} call_args
	 * @param {any[]} from
	 */
	generic(type, call_args, from) {
		let keep_vec = this.weak_root.deref();
		if(keep_vec === null) {
			console.log('ProxyHandlers reset KeepSome after gc collect');
			keep_vec = new KeepSome;
			this.weak_root = new WeakRef(keep_vec);
		}
		keep_vec.push(from.concat([null, type, 1, call_args]));
	}
	/**
	 * @param {[o: object, k: PropertyKey, v: any, r?: any]} call_args
	 * @param {any[]} from
	 */
	set_(call_args, from) {
		this.generic('set', call_args, from);
		return Reflect.set(...call_args);
	}
	/**
	 * @param {[o: object, k: PropertyKey, r?: any]} call_args
	 * @param {any[]} from
	 */
	get_(call_args, from) {
		this.generic('get', call_args, from);
		return Reflect.get(...call_args);
	}
	/**
	 * @param {[f: Function, o: any, l: ArrayLike<any>]} call_args
	 * @param {any[]} from
	 */
	apply_(call_args, from) {
		this.generic('apply', call_args, from);
		return Reflect.apply(...call_args);
	}
	/**
	 * @param {[o: object, k: PropertyKey, o: PropertyDescriptor]} call_args
	 * @param {any[]} from
	 */
	defineProperty_(call_args, from) {
		this.generic('defineProperty', call_args, from);
		return Reflect.defineProperty(...call_args);
	}
	/**
	 * @param {[o: object, k: PropertyKey]} call_args
	 * @param {any[]} from
	 */
	getOwnPropertyDescriptor_(call_args, from) {
		this.generic('getOwnPropertyDescriptor', call_args, from);
		return Reflect.getOwnPropertyDescriptor(...call_args);
	}
}
