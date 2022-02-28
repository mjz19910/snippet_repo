import {arg_error} from "./arg_error";
import {data_response} from "./data_response";
import {no_debugger_response} from "./no_debugger_response";

export type DebugAPI_breakpoint_return =
	arg_error | no_debugger_response | data_response;
