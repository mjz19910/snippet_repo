import {is_undefined} from "./is_undefined.js";

export class Repeat_1<T> {
	map_instance_or_d1: Map<symbol,Map<T,<U extends RecordKey<string>>(constructor_key_2: U) => AnyOrRepeat_1<InstanceType<U>>>>=new Map;
	map_instance_or: Map<symbol,<T,U>() => Map<T,AnyOrRepeat_1<U>>>=new Map;
	static base_map: Map<"key",<A,B extends RecordKey<A>,C extends InstanceType<B>>(q: B) => RepeatMapType<A,B,C>>=new Map;
	static cache_set=new Map<any,any>();
	static cache_get<A,B extends RecordKey<A>,C extends InstanceType<B>>(q: B): Map<A,C> {
		let value: Map<A,C>|null=null;
		if(this.cache_set.has(q.key)) {
			value=this.cache_set.get(q.key);
		}
		if(value) return value;
		value=new Map;
		this.cache_set.set(q.key,value);
		return value;
	}
	get_map_T_or<K,T extends RecordKey<K>,U extends InstanceType<T>>(constructor_key_0: T,value: U): U|null {
		let map=Repeat_1.cache_get<K,T,U>(constructor_key_0);
		if(!map) return null;
		let res=map.get(constructor_key_0.key);
		if(is_undefined(res)) {
			map.set(constructor_key_0.key,value);
			return value;
		}
		return res;
	}
	static from_TU_entry(a: AltPair<string,number>,b: number): AnyOrRepeat2_1<string,number> {
		switch(a[0]) {
			case 'T': return ['T',Repeat_1.get(a[1],b)];
			case 'U': return ['U',Repeat_1.get_num(a[1],b)];
		}
	}
	static map_1<M extends Map<T,Map<C,V>>,T,C,V>(a: M,b: T) {
		if(a.has(b)) {
			let v=a.get(b);
			if(v===void 0) throw new Error("Unreachable");
			return v;
		}
		/**@type {Map<C,V>} */
		let x: Map<C,V>=new Map;
		a.set(b,x);
		return x;
	}
	static get_require<U extends Map<any,any> extends Map<any,infer U>? U:never,T>(v: Map<T,U>|null,k: T): U|null {
		if(!v) return null;
		let x=v.get(k);
		if(x===void 0) return null;
		return x;
	}
	static get_with<T>(a: Map<T,Map<number,Repeat_1<T>>>,b: T,c: number) {
		let d=a.get(b);
		if(d===void 0) return null;
		let h=this.map_1<typeof a,T,number,Repeat_1<T>>(a,b);
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
	static N: Repeat_1<null>=new Repeat_1(null,0);
	static map: Map<string,Map<number,Repeat_1<string>>>=new Map;
	static map_num: Map<number,Map<number,Repeat_1<number>>>=new Map;
	static map_T: Map<symbol,<T,U>() => Map<T,Repeat_1<U>>>=new Map;
	static map_sym: Map<symbol,{}>=new Map;
	map_instance: Map<symbol,<T,U>() => Map<T,Repeat_1<U>>>=new Map;
	static once_getter<T extends RecordKey<symbol>>(i_rec: T) {
		return this.map_sym.get(i_rec.key);
	}
	map_once: Map<symbol,T>=new Map;
	get_map_T<U extends RecordKey<symbol>>(constructor_key: U,_: InstanceType<U>) {
		let res=Repeat_1.N.map_instance.get(constructor_key.key);
		if(!res) {
			Repeat_1.N.map_instance.set(constructor_key.key,() => new Map);
			return <T extends RecordKey<symbol>>(sym: T) => {
				return Repeat_1.map_sym.get(sym.key)!;
			};
		}
		return res;
	}
	has_map_T<U extends RecordKey<symbol>,V extends InstanceType<U>,C>(constructor_key: U,key: C): boolean {
		let res=Repeat_1.map_T.get(constructor_key.key);
		if(!res) {
			Repeat_1.map_T.set(constructor_key.key,() => new Map);
			return false;
		}
		let rq=res<C,V>();
		return rq.has(key);
	}
	static get(value: string,times: number): Repeat_1<string> {
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
	value;
	times;
	constructor(value: T,times: number) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}
