import {AnyOrRepeat} from "./AnyOrRepeat.js";
import {AnyRepeat2TS as AnyRepeat2} from "./AnyOrRepeat2";
import {InstanceRecord} from "./ConstructorWithSymbolType.js";
import {TypeAOrTypeB} from "./TypeAOrTypeB.js";

type L1Map<W extends InstanceRecord,X>=Map<W['type'],AnyOrRepeat<X>>;

type L2Map<V extends InstanceRecord>=Map<V['type'],<W extends InstanceRecord,X extends InstanceType<W>>(constructor_key_2: W,_: X) => L1Map<W,X>>;

type L3Map=Map<symbol,<T extends InstanceRecord,U extends InstanceType<T>>(constructor_key_1: T,_: U) => L2Map<T>>;
// + T + U - U; (T) ->

export class Repeat<T> {
	map_instance_or_d1: Map<symbol,Map<T,<U extends InstanceRecord>(constructor_key_2: U) => AnyOrRepeat<InstanceType<U>>>>=new Map;
	map_instance_or: Map<symbol,<T,U>() => Map<T,AnyOrRepeat<U>>>=new Map;
	static base_map: L3Map=new Map();
	base_map(): L3Map {
		return Repeat.base_map;

	};
	get_map_T_or<T extends InstanceRecord,U extends InstanceType<T>>(constructor_key_0: T,_: U) {
		let map=this.base_map();
		let res=map.get(constructor_key_0.type);
		if(!res) {
			let t=this;
			let l3_fn=<T extends InstanceRecord,U extends InstanceType<T>>(constructor_key_1: T,_: U): L2Map<T> => {
				let m_res=t.map_instance_or_d1.get(constructor_key_1.type);
				if(!m_res) m_res=new Map<InstanceType<T>,<U extends InstanceRecord>(constructor_key_2: U) => AnyOrRepeat<InstanceType<U>>>;
				t.map_instance_or_d1.set(constructor_key_1.type,m_res);
				let ret_map: L2Map<T>=new Map;
				return ret_map;
			};
			map.set(constructor_key_0.type,l3_fn);
			let ret=map.get(constructor_key_0.type);
			if(!ret) throw new Error("bad");
			return ret;
		}
		return res;
	}
	static from_TU_entry(a: TypeAOrTypeB<string,number>,b: number): AnyRepeat2<string,number> {
		switch(a[0]) {
			case 'T': return ['T',Repeat.get(a[1],b)];
			case 'U': return ['U',Repeat.get_num(a[1],b)];
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
	static get_with<T>(a: Map<T,Map<number,Repeat<T>>>,b: T,c: number) {
		let d=a.get(b);
		if(d===void 0) return null;
		let h=this.map_1<typeof a,T,number,Repeat<T>>(a,b);
		if(!h) throw 1;
		let i=h.get(c);
		if(i) {
			return i;
		} else {
			let rep=new this(b,c);
			h.set(c,rep);
			return rep;
		}
	}
	static N: Repeat<null>=new Repeat(null,0);
	static map: Map<string,Map<number,Repeat<string>>>=new Map;
	static map_num: Map<number,Map<number,Repeat<number>>>=new Map;
	static map_T: Map<symbol,<T,U>() => Map<T,Repeat<U>>>=new Map;
	map_instance: Map<symbol,<T,U>() => Map<T,Repeat<U>>>=new Map;
	get_map_T<U extends InstanceRecord>(constructor_key: U,_: InstanceType<U>): <T,U>() => Map<T,Repeat<U>> {
		let res=Repeat.N.map_instance.get(constructor_key.type);
		if(!res) {
			Repeat.N.map_instance.set(constructor_key.type,() => new Map);
			return () => new Map;
		}
		return res;
	}
	has_map_T<U extends InstanceRecord,V extends InstanceType<U>,C>(constructor_key: U,key: C): boolean {
		let res=Repeat.map_T.get(constructor_key.type);
		if(!res) {
			Repeat.map_T.set(constructor_key.type,() => new Map);
			return false;
		}
		let rq=res<C,V>();
		return rq.has(key);
	}
	static get(value: string,times: number): Repeat<string> {
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
}
