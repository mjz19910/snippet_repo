import {Repeat_1} from "./Repeat_1.js";

export class WMapTS<T,V> {
	value: Map<V,Map<number,Repeat_1<T>>>;
	constructor(map: Map<V,Map<number,Repeat_1<T>>>) {
		this.value=map;
	}
}
