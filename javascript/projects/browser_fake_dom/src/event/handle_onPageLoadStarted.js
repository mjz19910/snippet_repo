import {DOMBadge,FakeLocation,FakeWindow} from "../mod.js"
import {
	handle_addEventListener,handle_removeEventListener,
	handle_requestAnimationFrame,
	handle_dispatchEvent,
} from "./mod.js"
/**
 * @argument {FakeWindow} window
 * @argument {import("../types/onPageLoadStarted.js").PageLoadStateType} state
*/
export function handle_onPageLoadStarted(window,state) {
	var new_win
	new_win=new FakeWindow(new DOMBadge)
	if(new_win.default_document) {
		new_win.default_document()
	} else {
		throw new Error("Expected default_document on new Window")
	}
	if(!state.dom_impl_badge) {
		throw new Error("Expected dom_impl_badge on state")
	}
	window.m_document=new_win.document
	if(state.is_top_level) {
		window.m_top=window
	} else {
		new_win.m_top=window
	}
	var new_loc=new FakeLocation()
	if(!new_loc.location_setup) throw new Error("New location expected to have location_setup")
	if(!state.href) {
		if(state.url===void 0) {
			throw new Error("state.url was undefined")
		}
		try {
			new URL(state.url)
			state.href=state.url
		} catch {
			try {
				new URL("http://"+state.url)
				state.href="http://"+state.url
			} catch {}
		}
	}
	if(!state.href) {
		console.log('failed to parse url',state.url)
		throw new Error("Failed to setup location href")
	}
	new_loc.location_setup(state.dom_impl_badge,state.href)
	new_win.location=new_loc
	/**@type {{ [x: string]: { func: any; op: any; }[]; }} */
	var wind_event_lis={}
	window.addEventListener=handle_addEventListener(wind_event_lis)
	window.removeEventListener=handle_removeEventListener(wind_event_lis)
	window.requestAnimationFrame=handle_requestAnimationFrame(setTimeout)
	window.dispatchEvent=handle_dispatchEvent(wind_event_lis)
	window.setup_accessor=new_win.setup_accessor
}
