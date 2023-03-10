import {dbg_var} from "./dbg_var.js";
import {dbg_no_var} from "./dbg_no_var.js";
import {dbg_eval_hidden} from "./dbg_eval_hidden.js";

interface dbg_get_ty {get?: (__v: string) => dbg_eval_hidden|dbg_no_var|dbg_var;}
