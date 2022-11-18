import {Repeat} from "./Repeat.js";

export class WMapTS<T,V> {
	value: Map<V,Map<number,Repeat<T>>>;
	constructor(map: Map<V,Map<number,Repeat<T>>>) {
		this.value=map;
	}
}
