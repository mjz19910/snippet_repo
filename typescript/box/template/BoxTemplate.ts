import {BoxInterface} from "../BoxInterface.js"

export abstract class BoxTemplate<
	T extends string,
	V extends object|Function|void
> implements BoxInterface {
	constructor(value: V) {
		this.value=value
	}
	abstract readonly type: T
	abstract verify_name(name: string): boolean
	abstract readonly m_verify_name: string
	readonly value: V
	as_type(input_typeof: string): this|null {
		return typeof this.value===input_typeof? this:null
	}
}
