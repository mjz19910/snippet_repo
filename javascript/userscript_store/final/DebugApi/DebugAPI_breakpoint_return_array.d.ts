import {arg_error} from "./arg_error";
import {data_resp_arr} from "./data_resp_arr";
import {no_debugger_response} from "./no_debugger_response";


export type DebugAPI_breakpoint_return_array =
	arg_error | data_resp_arr | no_debugger_response;
