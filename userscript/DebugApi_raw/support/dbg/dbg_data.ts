import {dbg_var} from "./dbg_var.ts";
export type dbg_data={
	type: "data";
	result: dbg_var['data'];
	return: unknown;
};