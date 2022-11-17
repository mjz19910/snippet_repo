import {AnyRepeat2TS as C} from "./AnyRepeat2TS";
import {ConstructorWithSymbolType as A} from "./ConstructorWithSymbolType.js";
import {TypeAOrTypeB as B} from "./TypeAOrTypeB.js";
import {WMapTS} from "./WMapTS.js";

type D=string;
type E=number;
class F<K,V> extends Map<K,V> {
	__key:"test"="test";
	static from<K,V>(start: Map<K,V>) {
		let res_ent:[K,V][]=[];
		for (let i of start.entries()) {
			if(i[1] instanceof F) {
				res_ent.push([i[0], i[1]]);
			} else if(i[1] instanceof Map) {
				let [a,b]=i;
				res_ent.push([a,b]);
			}
		}
		return new F<K,V>(res_ent);
	}
}

class S<T> {
	static from_TU_entry(item: B<D,E>,times: E): C<D,E> {
		switch(item[0]) {
			case 'T': return ['T',S.get(item[1],times)];
			case 'U': return ['U',S.get_num(item[1],times)];
		}
	}
	static map_1<M extends F<T,F<C,V>>,T,C,V>(map: M,value: T) {
		if(map.has(value)) {
			return map.get(value);
		}
		/**@type {F<C,V>} */
		let x: F<C,V>=new F;
		map.set(value,x);
		return x;
	}
	static get_with<T>(map: F<T,F<E,S<T>>>,value: T,times: E) {
		let tt=map.get(value);
		if(tt===void 0) return null;
		let tm_map=this.map_1<typeof map,T,E,S<T>>(map,value);
		if(!tm_map) throw 1;
		let rep=tm_map.get(times);
		if(rep) {
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	static N: S<null>=new S(null,0);
	static map: F<string,F<E,S<string>>>=new F;
	static map_num: F<E,F<E,S<E>>>=new F;
	map_instance: F<symbol,<T>() => WMapTS<T,any>>=new F;
	get_map_T<U extends A,V extends InstanceType<U>,Z>(constructor_key: U,_: V): F<Z,F<E,S<V>>> {
		let res=S.N.map_instance.get(constructor_key.type);
		if(!res) {
			let map: F<V,F<E,S<V>>>=new F;
			S.N.map_instance.set(constructor_key.type,() => new WMapTS(map));
			return map;
		}
		let map: WMapTS<V,Z>=res();
		let rx=F.from(map.value);
		let top_entries:[Z,F<E, S<V>>][]=[];
		for (let i of rx.entries()) {
			let as_f=F.from(i[1]);
			top_entries.push([i[0],as_f]);
		}
		return new F(top_entries);
	}
	has_map_T<U extends A,V extends InstanceType<U>,C>(constructor_key: U,rep_null: S<null>,key: C): boolean {
		let res=rep_null.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<E, Map<E, S<V>>>} */
			let map: Map<E,Map<E,S<V>>>=new Map;
			rep_null.map_instance.set(constructor_key.type,() => new WMapTS(map));
			return false;
		}
		let map: WMapTS<V,C>=res();
		return map.value.has(key);
	}
	static get(value: string,times: E): S<string> {
		if(!this.map.has(value)) {
			this.map.set(value,new F);
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
	static get_num(value: E,times: E) {
		if(!this.map_num.has(value)) {
			this.map_num.set(value,new F);
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
	constructor(value: T,times: E) {
		this.value=value;
		this.times=times;
	}
	toString() {
		if(typeof this.value==='string') {
			return this.value+"x"+this.times;
		}
	}
}

export {S as RepeatTS};
