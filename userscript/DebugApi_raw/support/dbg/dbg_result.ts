import {dbg_var_result} from "./dbg_var_result.ts";
import {dbg_no_response} from "./dbg_no_response.ts";
import {dbg_data_array} from "./dbg_data_array.ts";
import {dbg_unexpected} from "./dbg_unexpected.ts";
import {dbg_data} from "./dbg_data.ts";
import {dbg_invalid_state} from "./dbg_invalid_state.ts";
import {dbg_arg_error} from "./dbg_arg_error.ts";

export type dbg_result_=dbg_arg_error|dbg_data|dbg_unexpected|dbg_invalid_state|dbg_data_array|dbg_no_response|dbg_var_result;
