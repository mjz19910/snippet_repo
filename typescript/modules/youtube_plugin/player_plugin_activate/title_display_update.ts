import {overlay_content_div} from "./elements/overlay_content_div"
import {title_on} from "./title_on"
import {title_text_overlay_enabled} from "./title_text_overlay_enabled"

export function title_display_update() {
	if(!overlay_content_div.value)
		return
	if(title_on&&title_text_overlay_enabled) {
		overlay_content_div.value.style.display=""
	} else {
		overlay_content_div.value.style.display="none"
	}
}
