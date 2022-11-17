import {AnyOrRepeatTS} from "./AnyOrRepeatTS.js";
import {AnyRepeat2TS} from "./AnyRepeat2TS";
import {ConstructorWithSymbolType} from "./ConstructorWithSymbolType.js";
import {TypeAOrTypeB} from "./TypeAOrTypeB.js";

type X=ConstructorWithSymbolType;

type A<T extends new (...args: any) => any>=InstanceType<T>;

class RepeatTS<T> {
	map_instance_or_d1: Map<symbol,Map<T,<U extends X>(constructor_key_2: U) => AnyOrRepeatTS<InstanceType<U>>>>=new Map;
	map_instance_or: Map<symbol,<T,U>() => Map<T,AnyOrRepeatTS<U>>>=new Map;
	base_map=new Map<
		symbol,
		<T extends X,U extends A<T>>(constructor_key_1: T,_: U) =>
			Map<
				T['type'],
				<T extends X,U extends A<T>>(constructor_key_2: T,_: U) =>
					Map<
						T['type'],
						AnyOrRepeatTS<U>
					>
			>
	>;
	map_instance_or_d0(): Map<symbol,<T extends X,U extends A<T>>(constructor_key_1: T,_: U) =>Map<T['type'],<T extends X,U extends A<T>>(constructor_key_2: T,_: U) =>Map<T['type'],AnyOrRepeatTS<U>>>> {
		return this.base_map;

	};
	get_map_T_or<T extends X,U extends A<T>>(constructor_key_0: T,_: U) {
		let res=this.base_map.get(constructor_key_0.type);
		if(!res) {
			let t=this;
			this.base_map.set(
				constructor_key_0.type,
				<T extends X,U extends InstanceType<T>>(constructor_key_1: T,_: U) => {
					let m_res=t.map_instance_or_d1.get(constructor_key_1.type);
					if(!m_res) m_res=new Map<InstanceType<T>,<U extends X>(constructor_key_2: U) => AnyOrRepeatTS<InstanceType<U>>>;
					t.map_instance_or_d1.set(constructor_key_1.type,m_res);
					return new Map;
				}
			);
			let ret=this.base_map.get(constructor_key_0.type);
			if(!ret) throw new Error("bad");
			return ret;
		}
		return res;
	}
	static from_TU_entry(a: TypeAOrTypeB<string,number>,b: number): AnyRepeat2TS<string,number> {
		switch(a[0]) {
			case 'T': return ['T',RepeatTS.get(a[1],b)];
			case 'U': return ['U',RepeatTS.get_num(a[1],b)];
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
	static get_with<T>(a: Map<T,Map<number,RepeatTS<T>>>,b: T,c: number) {
		let d=a.get(b);
		if(d===void 0) return null;
		let h=this.map_1<typeof a,T,number,RepeatTS<T>>(a,b);
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
	static N: RepeatTS<null>=new RepeatTS(null,0);
	static map: Map<string,Map<number,RepeatTS<string>>>=new Map;
	static map_num: Map<number,Map<number,RepeatTS<number>>>=new Map;
	static map_T: Map<symbol,<T,U>() => Map<T,RepeatTS<U>>>=new Map;
	map_instance: Map<symbol,<T,U>() => Map<T,RepeatTS<U>>>=new Map;
	get_map_T<U extends ConstructorWithSymbolType>(constructor_key: U,_: InstanceType<U>): <T,U>() => Map<T,RepeatTS<U>> {
		let res=RepeatTS.N.map_instance.get(constructor_key.type);
		if(!res) {
			RepeatTS.N.map_instance.set(constructor_key.type,() => new Map);
			return () => new Map;
		}
		return res;
	}
	has_map_T<U extends ConstructorWithSymbolType,V extends InstanceType<U>,C>(constructor_key: U,key: C): boolean {
		let res=RepeatTS.map_T.get(constructor_key.type);
		if(!res) {
			RepeatTS.map_T.set(constructor_key.type,() => new Map);
			return false;
		}
		let rq=res<C,V>();
		return rq.has(key);
	}
	static get(value: string,times: number): RepeatTS<string> {
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
		if(typeof this.value==='string') {
			return this.value+"x"+this.times;
		}
	}
}

export {RepeatTS};
