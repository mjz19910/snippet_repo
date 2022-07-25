import {on_yt_navigate_finish} from "../on_yt_navigate_finish"

export function dummy_event_callback() {
	if(on_yt_navigate_finish.length<=0)
		throw new Error("Dummy callback failure")
	on_yt_navigate_finish[0]({})
}
