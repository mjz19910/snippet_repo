import {cint_arr} from "./cint_arr.js";
import {cint_arr_str} from "./cint_arr_str.js";
import {on_game_data_set} from "./on_game_data_set.js"
import {remove_cint_item} from "./remove_cint_item.js"

export function wait_for_game_data(cint_item=null) {
	if(cint_item) {
		remove_cint_item(cint_arr,cint_item)
	}
	if(window._SM_Data) {
		on_game_data_set()
	} else {
		let cint_item=[0,-1]
		let cint=setTimeout(wait_for_game_data,0,cint_item)
		cint_item[1]=cint;
		cint_arr.push(cint_item);
		cint_arr_str.push(cint_item.join(","));
	}
}
