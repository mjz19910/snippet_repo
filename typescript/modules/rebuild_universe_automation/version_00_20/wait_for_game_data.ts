import {on_game_data_set} from "./on_game_data_set.js"

export function wait_for_game_data() {
	if(window._SM_Data) {
		on_game_data_set()
	} else {
		setTimeout(wait_for_game_data,0)
	}
}
