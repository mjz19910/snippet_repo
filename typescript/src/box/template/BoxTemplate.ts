export abstract class BoxTemplate<T extends string,V extends {}> {
	abstract readonly type: T
	value: V
	constructor(value: V) {
		this.value=value
	}
}
