import {RepeatTS} from "./RepeatTS.js";

export class WMapTS<T,V> {
	value: Map<V,Map<number,RepeatTS<T>>>;
	constructor(map: Map<V,Map<number,RepeatTS<T>>>) {
		this.value=map;
	}
}
