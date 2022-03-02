import BoxInterface from "./BoxInterface";
export type AnyTypeOfResult = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export default abstract class BoxTemplate<T extends string, V extends object | Function> implements BoxInterface {
	constructor(value: V) {
		this.value = value;
	}
	abstract type:T;
	value: V;
	as_type(_x: 'object'|'function') {
		let tof=typeof this.value;
		switch(tof){
			case 'object':if(_x === tof)return this;break;
			case 'function':if(_x === tof)return this;break;
			default:throw new Error("Box not necessary for primitive types")
		}
		return null;
	}
}
