import {AbstractBoxTemplate} from "../template/AbstractBoxTemplate.js";

export abstract class BoxManager<K extends string,T> {
	constructor(public target_type: K) {}
	construct_and_wrap(target_constructor: new (...args: any[]) => T,...constructor_arguments: any[]): AbstractBoxTemplate<K,T> {
		return this.wrap(new target_constructor(...constructor_arguments));
	}
	call_and_wrap(target_function: (...args: any[]) => T,...target_arguments: any[]): AbstractBoxTemplate<K,T> {
		return this.wrap(target_function(...target_arguments));
	}
	wrap(value: T): AbstractBoxTemplate<K,T> {
		return new AbstractBoxTemplate<K,T>(this.target_type,value);
	}
	unwrap(v: AbstractBoxTemplate<K,T>): T {
		return v.value;
	}
}
