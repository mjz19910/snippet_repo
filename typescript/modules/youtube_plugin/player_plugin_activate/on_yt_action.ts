import {title_text_overlay_enabled} from "./title_text_overlay_enabled"
import {fix_offset} from "./fix_offset"
import {is_yt_fullscreen_change_action} from "./is_yt_fullscreen_change_action"
import {title_text_overlay_update} from "./title_text_overlay_update"

export function on_yt_action(event: CustomEvent<{actionName: "yt-fullscreen-change-action"; args: [boolean]}>|CustomEvent<{actionName: string}>) {
	let {detail}=event
	if(is_yt_fullscreen_change_action(detail)) {
		let {args}=detail
		fix_offset()
		setTimeout(fix_offset)
		title_text_overlay_enabled.value=!args[0]
		title_text_overlay_update()
	}
}
