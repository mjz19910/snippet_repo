import {EventStore} from "./EventStore.js";
import {handle_addEventListener} from "./handle_addEventListener.js";
import {handle_dispatchEvent} from "./handle_dispatchEvent.js";
import {handle_removeEventListener} from "./handle_removeEventListener.js";
import {handle_requestAnimationFrame} from "./handle_requestAnimationFrame.js";
import {ModuleState} from "./ModuleState.js";

/** @argument {ModuleState} state_ */
export function handle_onPageLoadStarted(state_) {
	var new_win=state_.base_state().create_window();
	let state=state_.base_state().page_load_state();
	state.dom_impl_badge();
	new_win.set_m_top({});
	var new_loc=state.fake().window().location();
	new_win.set_location(new_loc);
	var wind_event_lis=new EventStore;
	window.addEventListener=handle_addEventListener(wind_event_lis);
	window.removeEventListener=handle_removeEventListener(wind_event_lis);
	window.requestAnimationFrame=handle_requestAnimationFrame(setTimeout);
	window.dispatchEvent=handle_dispatchEvent(wind_event_lis);
	window.setup_accessor=new_win.setup_accessor;
}
