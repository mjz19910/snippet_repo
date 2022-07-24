import {BoxInterface} from "../BoxInterface"
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
	abstract readonly m_verify_name: string;
	readonly value: V
	as_type(input_typeof: 'object'|'function'): [boolean,this|null] {
		let typeof_=typeof this.value
		switch(typeof_) {
			case 'object': return [input_typeof===typeof_,this]
			case 'function': return [input_typeof===typeof_,this]
		}
		return [false,null]
	}
}
