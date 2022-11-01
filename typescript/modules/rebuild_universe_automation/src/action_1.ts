import {do_dom_filter} from "./do_dom_filter.js"
import {on_game_data_set} from "./on_game_data_set.js"
import {wait_for_game_data} from "./wait_for_game_data.js"

export function action_1() {
	if(window._SM_Data) {
		on_game_data_set()
	} else {
		wait_for_game_data()
	}
	do_dom_filter()
}
