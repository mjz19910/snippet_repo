import {on_yt_navigate_finish} from "../youtube_plugin.user"

export function dummy_event_callback() {
	on_yt_navigate_finish[0]({})
}
