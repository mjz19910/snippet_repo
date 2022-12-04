import {auto_buy_obj} from "../auto_buy/auto_buy_obj.js";
import {PaceType} from "../PaceType.js";
import {pace_finish_proxy_apply} from "../pace_finish_proxy_apply.js";
import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element.js";

declare global {
	interface Window {
		Pace: PaceType;
	}
}

export function on_game_data_set() {
	remove_bad_dom_script_element();
	auto_buy_obj.pre_init();
	if(window.Pace.bar.progress==100) {
		auto_buy_obj.init();
		return;
	}
	window.Pace.bar.finish=new Proxy(window.Pace.bar.finish,{
		apply: pace_finish_proxy_apply
	});
}
