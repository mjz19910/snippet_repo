import {DebugFunctionCallback} from "../box/DebugFunctionCallback.js";
import {DebugFunctionType} from "../box/DebugFunctionType.js";

export class DebugFunctionValue {
	readonly type='function';
	constructor(public callback: DebugFunctionCallback,public function_: DebugFunctionType,public obj: {},public args: any[]) {}
	get_target() {
		return this.function_;
	}
}
