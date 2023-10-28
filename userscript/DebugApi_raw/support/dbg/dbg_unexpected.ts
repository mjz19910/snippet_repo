import {dbg_eval_hidden} from "./dbg_eval_hidden.ts";
import {dbg_no_var} from "./dbg_no_var.ts";
export type dbg_unexpected={
	type: "unexpected";
	data: {
		result: dbg_eval_hidden|dbg_no_var;
		return: unknown;
	};
};