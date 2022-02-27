import {on_game_data_set} from "./on_game_data_set";
import {timer_wait_for_game_data} from "./timer_wait_for_game_data";
import {cint_arr} from "./rebuild_the_universe_auto_typed_v0.1";

export function wait_for_game_data() {
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		let cint_item = [0, -1];
		let cint = setTimeout(timer_wait_for_game_data, 0, cint_item);
		cint_item[1] = cint;
		cint_arr.push(cint_item);
	}
}
