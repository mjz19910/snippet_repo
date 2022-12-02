import {DebugFunctionCallback} from "./DebugFunctionCallback.js";
import {DebugFunctionType} from "./DebugFunctionType.js";

export class DebugFunctionBox {
	readonly type='function';
	constructor(public callback: DebugFunctionCallback,public function_: DebugFunctionType,public obj: {},public args: any[]) {}
}
