import {GenericEventTarget} from "./GenericEventTarget";
import DebugAPI_breakpoint_return from "./breakpoint_return";
import {DebugAPI_breakpoint_return_array} from "./breakpoint_return_array";
import {SimpleJavascriptParser} from "./SimpleJavascriptParser";
import {RustSimpleParser} from "./RustSimpleParser";

export class DebugAPI {
	static simple_parser: RustSimpleParser;
	static javascript_parser: SimpleJavascriptParser;
	static the_instance: DebugAPI;
	static the(): DebugAPI;
	event_handler: GenericEventTarget;
	u?: CallableFunction;
	d?: CallableFunction;
	getEventListeners?: CallableFunction;
	parent: DebugAPI;
	storeObject(object: any): number;
	attach(
		debug: CallableFunction,
		undebug: CallableFunction,
		getEventListeners: CallableFunction
	): DebugAPI;
	startPortServer(): void;
	activateClass(
		class_value: NewableFunction,
		arg_vec: any[]
	): object;
	activateApply(
		function_value: CallableFunction,
		target_obj: any, arg_vec: any[]
	): any;
	debuggerBreakpointCode(): void;
	stringifyFunction(v: Function): string;
	debuggerGetVarArray_a(
		function_value: CallableFunction,
		activate: CallableFunction,
		var_match: string,
		...activate_vec: any[]
	): arg_error | data_resp_arr | no_debugger_response;
	debuggerGetVarArray_c(
		class_value: NewableFunction,
		target_arg_vec: any[],
		var_match: string
	): arg_error | data_resp_arr | no_debugger_response;
	debuggerGetVarArray(
		function_value: CallableFunction,
		target_obj: any,
		target_arg_vec: any[],
		var_match: string
	): arg_error | data_resp_arr | no_debugger_response;
	debuggerGetVar_a(
		function_value: CallableFunction | NewableFunction,
		activate: CallableFunction,
		var_name: string,
		...activate_vec: any[]
	): DebugAPI_breakpoint_return;
	debuggerGetVar_c(
		class_value: NewableFunction,
		target_arg_vec: any[],
		var_name: string
	): DebugAPI_breakpoint_return;
	debuggerGetVar(
		function_value: CallableFunction,
		target_obj: any,
		target_arg_vec: any[],
		var_name: string
	): DebugAPI_breakpoint_return;
	setPrivate(v: boolean): void;
	is_private: boolean;
}
