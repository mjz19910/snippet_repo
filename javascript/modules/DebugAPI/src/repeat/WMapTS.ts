import {RepeatTS} from "./RepeatTS.js";

export class WMapTS<T> {
	value: Map<number,Map<number,RepeatTS<T>>>;
	constructor(map: Map<number,Map<number,RepeatTS<T>>>) {
		this.value=map;
	}
}
