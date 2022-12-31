import {runInContext} from "vm";
import {InContextType} from "./InContextType.js";
const my_filename="";

/** @arg {{ctx:import("vm").Context, ctx_inner:InContextType|null}} obj */
export function run_script(obj) {
	obj.ctx_inner=runInContext(`this`,obj.ctx,{
		filename: my_filename,lineOffset: 5
	});
}
