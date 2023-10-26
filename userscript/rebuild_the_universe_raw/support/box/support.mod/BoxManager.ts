import {AbstractBoxTemplate} from "../template/AbstractBoxTemplate.ts";

export abstract class BoxManager<K extends string,T> {
	constructor(public target_type: K) {}
	construct_and_wrap(target_constructor: new (...args: unknown[]) => T,...constructor_arguments: unknown[]): AbstractBoxTemplate<K,T> {
		return this.wrap(new target_constructor(...constructor_arguments));
	}
	call_and_wrap(target_function: (...args: unknown[]) => T,...target_arguments: unknown[]): AbstractBoxTemplate<K,T> {
		return this.wrap(target_function(...target_arguments));
	}
	wrap(value: T): AbstractBoxTemplate<K,T> {
		return new AbstractBoxTemplate<K,T>(this.target_type,value);
	}
	unwrap(v: AbstractBoxTemplate<K,T>): T {
		return v.value;
	}
}
