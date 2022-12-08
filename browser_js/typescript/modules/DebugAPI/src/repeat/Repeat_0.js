import {is_undefined} from "../is_undefined";

/** @template T */
export class Repeat_0 {
	/** @type {Map<symbol,Map<T,<U extends new (...args: any) => any>(constructor_key_2: U) => InstanceType<U>|Repeat_0<InstanceType<U>>>>} */
	map_instance_or_d1=new Map;
	/** @type {Map<symbol,<T,U>() => Map<T,U|Repeat_0<U>>>} */
	map_instance_or=new Map;
	/** @type {Map<"key",<A,B extends RecordKey<A>,C extends InstanceType<B>>(q: B) => Map<A,C|Repeat_0<C>>>} */
	static base_map=new Map;
	/** @type {Map<any,any>} */
	static cache_set=new Map();
	/** @template A @template {RecordKey<A>} B @template {InstanceType<B>} C @arg {B} q @returns {Map<A,C>} */
	static cache_get(q) {
		/**@type {Map<A,C>|null} */
		let value=null;
		if(this.cache_set.has(q.key)) {
			value=this.cache_set.get(q.key);
		}
		if(value) return value;
		value=new Map;
		this.cache_set.set(q.key,value);
		return value;
	}
	/**@template A @template {RecordKey<A>} B @template {InstanceType<B>} C @arg {B} constructor_key_0 @arg {C} value */
	get_map_T_or(constructor_key_0,value) {
		/**@type {Map<A, C>} */
		let map=Repeat_0.cache_get(constructor_key_0);
		if(!map) return null;
		let res=map.get(constructor_key_0.key);
		if(is_undefined(res)) {
			map.set(constructor_key_0.key,value);
			return value;
		}
		return res;
	}
	/**@arg {AltPair<string,number>} a @arg {number} b @returns {["string",string|Repeat_0<string>]|["number",number|Repeat_0<number>]} */
	static from_TU_entry(a,b) {
		switch(a[0]) {
			case 'T': return ['string',Repeat_0.get(a[1],b)];
			case 'U': return ['number',Repeat_0.get_num(a[1],b)];
		}
	}
	/**@template A,B @arg {[A,B]} _args */
	static drop2(..._args) {}
	/**@template {Map<B,Map<C,D>>} A @template B,C,D @arg {A} a @arg {B} b @arg {C} c @arg {D} d */
	static map_1(a,b,c,d) {
		this.drop2(c,d);
		if(a.has(b)) {
			let v=a.get(b);
			if(v===void 0) throw new Error("Unreachable");
			return v;
		}
		/**@type {Map<C,D>} */
		let x=new Map;
		a.set(b,x);
		return x;
	}
	/**@template {Map<any,any> extends Map<any,infer U>? U:never} U @template T @arg {Map<T,U>|null} v @arg {T} k @returns {U|null} */
	static get_require(v,k) {
		if(!v) return null;
		let x=v.get(k);
		if(x===void 0) return null;
		return x;
	}
	/**@template T  @arg {Map<T,Map<number,Repeat_0<T>>>} a @arg {T} b @arg {number} c */
	static get_with(a,b,c) {
		let d=a.get(b);
		if(d===void 0) return null;
		let h=this.map_1(a,b,{},{});
		if(!h) throw new Error("1");
		let i=h.get(c);
		if(i) {
			return i;
		} else {
			let rep=new this(b,c);
			h.set(c,rep);
			return rep;
		}
	}
	static N=new Repeat_0(null,0);
	/**@type {Map<string,Map<number,Repeat_0<string>>>} */
	static map=new Map;
	/**@type {Map<number,Map<number,Repeat_0<number>>>} */
	static map_num=new Map;
	/**@type {Map<symbol,{}>} */
	static map_sym=new Map;
	/**@type {Map<symbol,<T,U>(t:T,u:U) => Map<T,Repeat_0<U>>>} */
	map_T=new Map;
	/**@type {Map<symbol,<T,U>() => Map<T,Repeat_0<U>>>} */
	map_instance=new Map;
	/** @template {RecordKey<symbol>} T @arg {T} i_rec */
	static once_getter(i_rec) {
		return this.map_sym.get(i_rec.key);
	}
	/**@type {Map<symbol,T>} */
	map_once=new Map;
	/**@template {RecordKey<symbol>} U @arg {U} constructor_key @arg {InstanceType<U>} _ */
	get_map_T(constructor_key,_) {
		let res=Repeat_0.N.map_T.get(constructor_key.key);
		if(!res) {
			Repeat_0.N.map_T.set(constructor_key.key,() => new Map);
			/**@template {RecordKey<symbol>} T @arg {T} sym */
			return (sym) => {
				let value=Repeat_0.map_sym.get(sym.key);
				if(value===void 0) throw new Error("1");
				return value;
			};
		}
		return res;
	}
	// U=RecordKey<symbol> V=InstanceType<U> C=C
	/**@template {RecordKey<symbol>} U @template {InstanceType<U>} V @template C @arg {U} constructor_key @arg {C} key @arg {V} value*/
	has_map_T(constructor_key,key,value) {
		let res=Repeat_0.N.map_T.get(constructor_key.key);
		if(!res) {
			Repeat_0.N.map_T.set(constructor_key.key,() => new Map);
			return false;
		}
		let rq=res(key,value);
		return rq.has(key);
	}
	/**@arg {string} value @arg {number} times */
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
	/**@arg {number} value @arg {number} times */
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
	/** @arg {T} value @arg {number} times */
	constructor(value,times) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}
