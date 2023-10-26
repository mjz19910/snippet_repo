import {get_nearest_script} from "./get_nearest_script.ts";
import {register_obj_with_registry} from "./register_obj_with_registry.ts";
import {scripts} from "./scripts.ts";

export function str_index_of_inject() {
	let cur_script=get_nearest_script();
	if(cur_script===null) return;
	let had_script=scripts.has(cur_script);
	if(!had_script) {
		try {
			scripts.add(cur_script);
		} catch(e) {
			debugger;
		}
		let id=register_obj_with_registry(cur_script);
		console.log('new registry id',id);
		if(!(cur_script instanceof HTMLScriptElement))
			return;
		if(cur_script.src.includes("opentracker")) {
			cur_script.remove();
			throw new Error("No tracking");
		}
		console.log(cur_script);
	}
}
