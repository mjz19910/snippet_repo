import {do_dom_filter} from "./do_dom_filter"
import {auto_buy_obj} from "./rebuild_the_universe_auto_v0.2"

export function on_game_data_set() {
	do_dom_filter()
	auto_buy_obj.pre_init()
	auto_buy_obj.init()
}
