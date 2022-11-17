import {WMap} from "./WMap";

/** @template T */
export class Repeat {
	/**
	 * @arg {import("./TU.js").TU<string, number>} item
	 * @returns {import("./AnyRepeat2.js").AnyRepeat2<string, number>}
	 * @param {number} times
	 */
	static from_TU_entry(item,times) {
		switch(item[0]) {
			case 'T': return ['T',Repeat.get(item[1],times)];
			case 'U': return ['U',Repeat.get_num(item[1],times)];
		}
	}
	/**
	 * @template T
	 * @arg {Map<T, Map<number, Repeat<T>>>} map
	 * @arg {T} value
	 * @param {number} times
	 */
	static get_with(map,value,times) {
		if(!map.has(value)) {
			map.set(value,new Map);
		}
		let tm_map=map.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**@type {Repeat<null>} */
	static N=new Repeat(null,0);
	/**@type {Map<string, Map<number, Repeat<string>>>} */
	static map=new Map;
	/**@type {Map<number, Map<number, Repeat<number>>>} */
	static map_num=new Map;
	/**@type {Map<symbol, <T>()=>WMap<T>>} */
	map_instance=new Map;
	/**
	 * @template {import("./ConstructorWithSymbolType.js").ConstructorWithSymbolType & {type:symbol}} U
	 * @template {InstanceType<U>} V
	 * @arg {U} constructor_key
	 * @arg {V} _
	 * @returns {Map<number, Map<number, Repeat<V>>>}
	 * */
	get_map_T(constructor_key,_) {
		let res=Repeat.N.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<number, Map<number, Repeat<V>>>} */
			let map=new Map;
			Repeat.N.map_instance.set(constructor_key.type,() => new WMap(map));
			return map;
		}
		/**@type {WMap<V>} */
		let map=res();
		return map.value;
	}
	/**
	 * @template {import("./ConstructorWithSymbolType.js").ConstructorWithSymbolType & {key:symbol}} U
	 * @template {InstanceType<U>} V
	 * @arg {Repeat<null>} rep_null
	 * @arg {U} constructor_key
	 * @arg {number} key
	 * @returns {boolean}
	 * */
	has_map_T(constructor_key,rep_null,key) {
		let res=rep_null.map_instance.get(constructor_key.key);
		if(!res) {
			/**@type {Map<number, Map<number, Repeat<V>>>} */
			let map=new Map;
			rep_null.map_instance.set(constructor_key.key,() => new WMap(map));
			return false;
		}
		/**@type {WMap<V>} */
		let map=res();
		return map.value.has(key);
	}
	/**
	 * @param {string} value
	 * @param {number} times
	 * @returns {Repeat<string>}
	 */
	static get(value,times) {
		if(!this.map.has(value)) {
			this.map.set(value,new Map);
		}
		let tm_map=this.map.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**
	 * @param {number} value
	 * @param {number} times
	 */
	static get_num(value,times) {
		if(!this.map_num.has(value)) {
			this.map_num.set(value,new Map);
		}
		let tm_map=this.map_num.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**
	 * @param {T} value
	 * @param {number} times
	 */
	constructor(value,times) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}
