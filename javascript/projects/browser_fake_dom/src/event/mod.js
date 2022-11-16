import {handle_addEventListener} from "./handle_addEventListener.js"
import {handle_dispatchEvent} from "./handle_dispatchEvent.js"
import {handle_onPageLoadStarted} from "./handle_onPageLoadStarted.js"
import {handle_removeEventListener} from "./handle_removeEventListener.js"
import {handle_requestAnimationFrame} from "./handle_requestAnimationFrame.js"

export function use_imports() {
	return [
		handle_onPageLoadStarted,
		handle_addEventListener,
		handle_removeEventListener,
		handle_requestAnimationFrame,
		handle_dispatchEvent,
	]
}

