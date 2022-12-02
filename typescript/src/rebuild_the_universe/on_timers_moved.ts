import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element.js";
import {on_game_data_set} from "./on_game_data_set.js";
import {wait_for_game_data} from "./wait_for_game_data.js";

declare global {
	interface Window {
		_SM_Data: unknown;
	}
}

export function on_timers_moved() {
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		wait_for_game_data();
	}
	remove_bad_dom_script_element();
}
