import {dbg_eval_hidden} from "./dbg_eval_hidden.ts";
import {dbg_no_var} from "./dbg_no_var.ts";
import {dbg_var} from "./dbg_var.ts";

export interface dbg_get_ty {get?: (__v: string) => dbg_eval_hidden|dbg_no_var|dbg_var;}
