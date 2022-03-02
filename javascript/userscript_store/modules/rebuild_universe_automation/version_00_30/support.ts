import {Box} from "types/vm/box/Box";

// must be a class for extending it to work
export class PromiseBox {
	type: "promise_box"="promise_box";
	await_type: "Box"="Box";
	value:Promise<Box>;
	as_type(type: "object"): PromiseBox | null {
		return this;
	};
	constructor(value: Promise<Box>){
		this.value=value;
	}
}

export type AnyTypeOfResult = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";