import {AnyTypeOfResult} from "./AnyTypeOfResult.js"

export abstract class BoxTemplate<
	T extends string,
	V extends object|Function|void
> {
	constructor(value: V) {
		this.value=value
	}
	abstract readonly type: T
	abstract verify_name(name: string): boolean
	abstract readonly m_verify_name: string
	readonly value: V
	as_type(input_typeof: AnyTypeOfResult): this|null {
		return typeof this.value===input_typeof? this:null
	}
}
