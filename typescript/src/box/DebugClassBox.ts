import {ClassCallbackFunction} from "./ClassCallbackFunction.js";

export class DebugClassBox {
	readonly type='class';
	constructor(public callback: ClassCallbackFunction,public constructor_: new (...a: any[]) => {},public args: any[]) {}
	get_target() {
		return this.constructor_;
	}
}
