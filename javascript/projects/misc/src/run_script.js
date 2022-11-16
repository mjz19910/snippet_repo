import {runInContext} from "vm"
const my_filename=""
/**@arg {{ctx:{}, ctx_inner:{}|null}} obj */
export function run_script(obj) {
	obj.ctx_inner=runInContext(`this`,obj.ctx,{filename: my_filename,lineOffset: 5})
}
