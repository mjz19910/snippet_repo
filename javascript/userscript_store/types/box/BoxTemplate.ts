import {BoxInterface} from "./BoxInterface"
export type AnyTypeOfResult="string"|"number"|"bigint"|"boolean"|"symbol"|"undefined"|"object"|"function"
export abstract class BoxTemplate<
	T extends string,
	V extends object|Function|void
> implements BoxInterface {
	constructor(value: V) {
		this.value=value
	}
	abstract readonly type: T
	abstract verify_name(name: string): boolean
	readonly value: V
	as_type(_x: 'object'|'function') {
		let tof=typeof this.value
		switch(tof) {
			case 'object': if(_x===tof) return this; break
			case 'function': if(_x===tof) return this; break
			default: throw new Error("Box not necessary for primitive types")
		}
		return null
	}
}
