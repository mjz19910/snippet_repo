import {to_token_arr} from "../js/to_token_arr.js";
import {next_bracket_pair as x} from "./next_bracket_pair.js";
import js_str_2 from "./src_template_code.js";
import js_str_1 from "./src_template_decrypt_arr_str.js";

export function use_encrypt_code() {
	let eq_idx=js_str_1.indexOf("=");
	let var_def=js_str_1.slice(0,eq_idx);
	let var_code=js_str_1.slice(eq_idx+1,js_str_1.lastIndexOf(";"));
	let code_lvl=js_str_2.split(/(\{|\})/).filter(e => e!=="");
	let level_data=to_token_arr(code_lvl);
	let index=0;
	for(let i=0;i<6;i++) {
		index=x(level_data,index);
	}
	let do_eval=false;
	if(do_eval) {
		eval(var_def+"="+var_code+";console.log("+var_def.split(" ")[1]+");"+js_str_2);
	}
}
