import {Box} from "./Box.js";

export class PromiseFunctionBox {
	readonly type="PromiseFunctionBox";
	value: (...args: Box[]) => Promise<Box>;
	constructor(value: (...args: Box[]) => Promise<Box>) {
		this.value=value;
	}
}
