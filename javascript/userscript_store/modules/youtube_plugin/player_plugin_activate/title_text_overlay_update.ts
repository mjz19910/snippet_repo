import {overlay_hide_ui_input} from "../overlay_hide_ui_input"
import {title_text_overlay_enabled} from "../title_text_overlay_enabled"
import {title_display_update} from "./title_display_update"

export function title_text_overlay_update() {
	title_display_update()
	if(!overlay_hide_ui_input.value)
		return
	if(title_text_overlay_enabled) {
		overlay_hide_ui_input.value.style.color=''
	} else {
		overlay_hide_ui_input.value.style.color='#888'
	}
}
