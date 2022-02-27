import {remove_cint_item} from "./remove_cint_item";
import {cint_arr} from "./rebuild_the_universe_auto_typed_v0.1";
import {wait_for_game_data} from "./wait_for_game_data";

export function timer_wait_for_game_data(p_cint_item: [1 | 2, number, string]) {
	remove_cint_item(cint_arr, p_cint_item); WeakRef;
	let cint_item = [0, -1];
	let cint = setTimeout(wait_for_game_data, 0, cint_item);
	cint_item[1] = cint;
	cint_arr.push(cint_item);
}
