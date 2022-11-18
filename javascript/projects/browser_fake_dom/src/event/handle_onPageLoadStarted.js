import {PageLoaderState} from "../../../page_loader/index.js";
import {fake} from "../browse/fake.js";
import {FakeLocation} from "../FakeLocation.js";
import {FakeWindow} from "../FakeWindow.js";
import {DomBadge} from "../implementation/DomBadge.js";
import {EventStore} from "./EventStore.js";
import {handle_addEventListener} from "./handle_addEventListener.js";
import {handle_dispatchEvent} from "./handle_dispatchEvent.js";
import {handle_removeEventListener} from "./handle_removeEventListener.js";
import {handle_requestAnimationFrame} from "./handle_requestAnimationFrame.js";

/** @argument {FakeWindow} window @argument {PageLoaderState} base_state */
export function handle_onPageLoadStarted(window,base_state) {
	var new_win;
	new_win=new FakeWindow(new DomBadge);
	let state=base_state.page_load_state;
	if(!state.dom_impl_badge) {
		throw new Error("Expected dom_impl_badge on state");
	}
	if(state.is_top_level) {
		window.m_top=window;
	} else {
		new_win.m_top=window;
	}
	var new_loc=fake.window.location;
	if(!new_loc.location_setup) throw new Error("New location expected to have location_setup");
	if(!state.href) {
		if(base_state.url===void 0) {
			throw new Error("base_state.url was undefined");
		}
		if(base_state.url===null) {
			throw new Error("base_state.url was null");
		}
		try {
			new URL(base_state.url);
			state.href=base_state.url;
		} catch {
			try {
				new URL("http://"+state.url);
				state.href="http://"+state.url;
			} catch {}
		}
	}
	if(!state.href) {
		console.log('failed to parse url',state.url);
		throw new Error("Failed to setup location href");
	}
	new_loc.location_setup(state.dom_impl_badge,state.href);
	new_win.location=new_loc;
	var wind_event_lis=new EventStore;
	window.addEventListener=handle_addEventListener(wind_event_lis);
	window.removeEventListener=handle_removeEventListener(wind_event_lis);
	window.requestAnimationFrame=handle_requestAnimationFrame(setTimeout);
	window.dispatchEvent=handle_dispatchEvent(wind_event_lis);
	window.setup_accessor=new_win.setup_accessor;
}
