import {ClassCallbackFunction} from "./ClassCallbackFunction.ts";

export class DebugClassValue {
	readonly type='class';
	constructor(public callback: ClassCallbackFunction,public constructor_: new (...a: any[]) => {},public args: any[]) {}
	get_target() {
		return this.constructor_;
	}
}
