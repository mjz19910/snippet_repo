import {title_on} from "./title_on.js"
import {title_display_update} from "./title_display_update.js"

export function title_display_toggle() {
	title_on.value=!title_on.value
	title_display_update()
	localStorage["title_save_data"]=JSON.stringify({value: title_on})
}
