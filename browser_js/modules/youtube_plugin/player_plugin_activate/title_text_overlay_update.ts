import {overlay_hide_ui_input} from "./elements/overlay_hide_ui_input.js"
import {title_text_overlay_enabled} from "./title_text_overlay_enabled.ts"
import {title_display_update} from "./title_display_update.ts"

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
