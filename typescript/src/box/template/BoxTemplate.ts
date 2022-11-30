export abstract class BoxTemplate<
	T extends string,
	V extends object|Function|void
> {
	constructor(value: V) {
		this.value=value
	}
	abstract readonly type: T
	value: V
}
