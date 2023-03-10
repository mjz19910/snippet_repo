import {BoxTemplate} from "./BoxTemplate.js";

export class AbstractBoxTemplate<K extends string,T> extends BoxTemplate<K,T> {
	readonly type: K;
	readonly abstract=true;
	constructor(type: K,value: T) {
		super(value);
		this.type=type;
	}
	downgrade(): BoxTemplate<K,T> {return this;}
}
