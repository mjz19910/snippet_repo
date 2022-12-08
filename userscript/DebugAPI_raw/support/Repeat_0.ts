import {is_undefined} from "./is_undefined";

/** @template T */
export class RepeatL_0<T> {
	map_instance_or_d1: Map<symbol,Map<T,<U extends new (...args: any) => any>(constructor_key_2: U) => InstanceType<U>|Repeat_0<InstanceType<U>>>>=new Map;
	static map_instance_or: Map<symbol,<T,U>() => Map<T,U|Repeat_0<U>>>=new Map;
	static base_map: Map<"key",<A,B extends RecordKey<A>,C extends InstanceType<B>>(q: B) => Map<A,C|Repeat_0<C>>>=new Map;
	static cache_set: Map<any,any>=new Map();
	static cache_get<A,B extends RecordKey<A>,C extends InstanceType<B>>(_A: A,q: B): Map<A,C> {
		/**@type {Map<A,C>|null} */
		let value: Map<A,C>|null=null;
		if(this.cache_set.has(q.key)) {
			value=this.cache_set.get(q.key);
		}
		if(value) return value;
		value=new Map;
		this.cache_set.set(q.key,value);
		return value;
	}
	static get_map_T_or<A,B extends RecordKey<A>,C extends InstanceType<B>>(A_: A,constructor_key_0: B,value: C): C|null {
		RepeatL_0.cache_get(A_,constructor_key_0);
		let map=RepeatL_0.cache_get(A_,constructor_key_0);
		if(!map) return null;
		let res=map.get(constructor_key_0.key);
		if(is_undefined(res)) {
			map.set(constructor_key_0.key,value);
			return value;
		}
		return res;
	}
	static from_TU_entry(a: AltPair<string,number>,b: number): ["string",string|RepeatL_0<string>]|["number",number|RepeatL_0<number>] {
		switch(a[0]) {
			case 'T': return ['string',RepeatL_0.get(a[1],b)];
			case 'U': return ['number',RepeatL_0.get_num(a[1],b)];
		}
	}
	static drop2<A,B>(..._args: [A,B]) {}
	static map_1<A extends Map<B,Map<C,D>>,B,C,D>(a: A,b: B,c: C,d: D) {
		this.drop2(c,d);
		if(a.has(b)) {
			let v=a.get(b);
			if(v===void 0) throw new Error("Unreachable");
			return v;
		}
		/**@type {Map<C,D>} */
		let x: Map<C,D>=new Map;
		a.set(b,x);
		return x;
	}
	static get_require<U,T>(v: Map<T,U>|null,k: T): U|null {
		if(!v) return null;
		let x=v.get(k);
		if(x===void 0) return null;
		return x;
	}
	static get_with<T>(a: Map<T,Map<number,RepeatL_0<T>>>,b: T,c: number) {
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
	static map: Map<string,Map<number,RepeatL_0<string>>>=new Map;
	static map_num: Map<number,Map<number,RepeatL_0<number>>>=new Map;
	static map_sym: Map<symbol,{}>=new Map;
	static map_T: Map<symbol,<T,U>(t: T,u: U) => Map<T,RepeatL_0<U>>>=new Map;
	static map_instance: Map<symbol,<T,U>() => Map<T,RepeatL_0<U>>>=new Map;
	static once_getter<T extends RecordKey<symbol>>(i_rec: T) {
		return this.map_sym.get(i_rec.key);
	}
	/**@arg {string} value @arg {number} times */
	static get(value: string,times: number) {
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
	static get_num(value: number,times: number) {
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
	value: T;
	times: number;
	/** @arg {T} value @arg {number} times */
	constructor(value: T,times: number) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}
