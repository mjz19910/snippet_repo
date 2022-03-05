export class TypeEraseClass<T> {
	constructor(v: T) {
		this.erase_value = v;
	}
	erase_value: T;
	get_value(): T {
		return this.erase_value;
	}
}
