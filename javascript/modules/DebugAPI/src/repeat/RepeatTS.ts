import {AnyRepeat2TS as C} from "./AnyRepeat2TS";
import {ConstructorWithSymbolType as A} from "./ConstructorWithSymbolType.js";
import {TypeAOrTypeB as B} from "./TypeAOrTypeB.js";
import {WMapTS} from "./WMapTS.js";

type D=string;
type E=number;
type F<K,V>=Map<K,V>;
const F=Map;
type S<T>=RepeatTS<T>;

export class RepeatTS<T> {
	static from_TU_entry(item: B<D,E>,times: number): C<D,E> {
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
	static get_with<T>(map: F<T,F<number,S<T>>>,value: T,times: number) {
		let tt=map.get(value);
		if(tt === void 0)return null;
		let tm_map=this.map_1<typeof map,T,number,S<T>>(map,value);
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
	static N: S<null>=new RepeatTS(null,0);
	static map: Map<string,Map<number,RepeatTS<string>>>=new Map;
	static map_num: Map<number,Map<number,RepeatTS<number>>>=new Map;
	map_instance: Map<symbol,<T>() => WMapTS<T,any>>=new Map;
	get_map_T<U extends A, V extends InstanceType<U>, >(constructor_key: U,_: V): Map<V,Map<number,RepeatTS<V>>> {
		let res=RepeatTS.N.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<V, Map<number, RepeatTS<V>>>} */
			let map: Map<V,Map<number,RepeatTS<V>>>=new Map;
			RepeatTS.N.map_instance.set(constructor_key.type,() => new WMapTS(map));
			return map;
		}
		let map: WMapTS<V,any>=res();
		return map.value;
	}
	has_map_T<U extends A,V extends InstanceType<U>,C>(constructor_key: U,rep_null: RepeatTS<null>,key: C): boolean {
		let res=rep_null.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<number, Map<number, RepeatTS<V>>>} */
			let map: Map<number,Map<number,RepeatTS<V>>>=new Map;
			rep_null.map_instance.set(constructor_key.type,() => new WMapTS(map));
			return false;
		}
		let map: WMapTS<V,C>=res();
		return map.value.has(key);
	}
	static get(value: string,times: number): S<string> {
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
		if(typeof this.value==='number') {
			return this.value+"x"+this.times;
		}
	}
}

const S=RepeatTS;