import {DebugFunctionCallback} from "../box/DebugFunctionCallback.ts";
import {DebugFunctionType} from "../box/DebugFunctionType.ts";

export class DebugFunctionValue {
	readonly type='function';
	constructor(public callback: DebugFunctionCallback,public function_: DebugFunctionType,public obj: {},public args: any[]) {}
	get_target() {
		return this.function_;
	}
}
