import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element";
import {auto_buy_obj} from "./rebuild_the_universe_auto_typed_v0.1";

function on_page_is_loaded() {
	remove_bad_dom_script_element();
	if(window.Pace.bar.progress == 100) {
		auto_buy_obj.init();
	} else {
		let original_pace_bar_finish = window.Pace.bar.finish;
		window.Pace.bar.finish = function() {
			original_pace_bar_finish.call(this);
			auto_buy_obj.init();
		};
	}
}
