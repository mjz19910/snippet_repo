import {ConstructorWithSymbolType} from "./ConstructorWithSymbolType.js";
import {TU} from "./TU.js";
import {WMap} from "./WMap";
import {WMapTS} from "./WMapTS.js";

type G<T>=RepeatTS<T>;

type X<T>=T|G<T>;

type TX<A,B>=["T",X<A>]|["U",X<B>];

export class RepeatTS<T> {
	static from_TU_entry(item: TU<string,number>,times: number): TX<string,number> {
		switch(item[0]) {
			case 'T': return ['T',RepeatTS.get(item[1],times)];
			case 'U': return ['U',RepeatTS.get_num(item[1],times)];
		}
	}
	static map_1<M extends Map<T,Map<C,V>>,T,C,V>(map: M,value: T) {
		if(map.has(value)) {
			return map.get(value);
		}
		/**@type {Map<C,V>} */
		let x: Map<C,V>=new Map;
		map.set(value,x);
		return x;
	}
	static get_with<T>(map: Map<T,Map<number,RepeatTS<T>>>,value: T,times: number) {
		let tm_map=this.map_1(map,value);
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
	static N: RepeatTS<null>=new RepeatTS(null,0);
	static map: Map<string,Map<number,RepeatTS<string>>>=new Map;
	static map_num: Map<number,Map<number,RepeatTS<number>>>=new Map;
	map_instance: Map<symbol,<T>() => WMapTS<T>>=new Map;
	get_map_T<U extends ConstructorWithSymbolType,V extends InstanceType<U>>(constructor_key: U,_: V): Map<number,Map<number,RepeatTS<V>>> {
		let res=RepeatTS.N.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<number, Map<number, RepeatTS<V>>>} */
			let map: Map<number,Map<number,RepeatTS<V>>>=new Map;
			RepeatTS.N.map_instance.set(constructor_key.type,() => new WMapTS(map));
			return map;
		}
		let map: WMapTS<V>=res();
		return map.value;
	}
	has_map_T<U extends ConstructorWithSymbolType,V extends InstanceType<U>>(constructor_key: U,rep_null: RepeatTS<null>,key: number): boolean {
		let res=rep_null.map_instance.get(constructor_key.type);
		if(!res) {
			/**@type {Map<number, Map<number, RepeatTS<V>>>} */
			let map: Map<number,Map<number,RepeatTS<V>>>=new Map;
			rep_null.map_instance.set(constructor_key.type,() => new WMapTS(map));
			return false;
		}
		let map: WMapTS<V>=res();
		return map.value.has(key);
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
		if(typeof this.value==='number') {
			return this.value+"x"+this.times;
		}
	}
}
