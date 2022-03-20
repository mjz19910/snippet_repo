import {FakeLocation, FakeWindow} from "../mod.js";
import {
	handle_addEventListener, handle_removeEventListener,
	handle_requestAnimationFrame,
	handle_dispatchEvent,
} from "./mod.js";
import {DOMBadge} from "fake-dom-implementation";
/**
 * @argument {FakeWindow} window
 * @argument {import("fake-dom-types").page_load_state} page_load_state
*/
export function handle_onPageLoadStarted(window, page_load_state) {
	var new_win;
	new_win = new FakeWindow(new DOMBadge);
	if(new_win.default_document) {
		new_win.default_document();
	} else {
		throw new Error("Expected default_document on new Window");
	}
	window.m_document = new_win.document;
	if(page_load_state.is_top_level) {
		window.m_top = window;
	} else {
		new_win.m_top = window;
	}
	var new_loc = new FakeLocation();
	if(!new_loc.location_setup) throw new Error("New location expected to have location_setup");
	new_loc.location_setup(page_load_state.dom_impl_badge, page_load_state.href);
	new_win.location = new_loc;
	/**@type {{ [x: string]: { func: any; op: any; }[]; }} */
	var wind_event_lis = {};
	window.addEventListener = handle_addEventListener(wind_event_lis);
	window.removeEventListener = handle_removeEventListener(wind_event_lis);
	window.requestAnimationFrame = handle_requestAnimationFrame(setTimeout);
	window.dispatchEvent = handle_dispatchEvent(wind_event_lis);
	window.setup_accessor = new_win.setup_accessor;
}
