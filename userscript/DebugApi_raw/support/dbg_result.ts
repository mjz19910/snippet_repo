import {dbg_var_result} from "./dbg_var_result.js";
import {dbg_no_response} from "./dbg_no_response.js";
import {dbg_data_array} from "./dbg_data_array.js";
import {dbg_unexpected} from "./dbg_unexpected.js";
import {dbg_data} from "./dbg_data.js";
import {dbg_invalid_state} from "./dbg_invalid_state.js";
import {dbg_arg_error} from "./dbg_arg_error.js";

export type dbg_result_=dbg_arg_error|dbg_data|dbg_unexpected|dbg_invalid_state|dbg_data_array|dbg_no_response|dbg_var_result;
