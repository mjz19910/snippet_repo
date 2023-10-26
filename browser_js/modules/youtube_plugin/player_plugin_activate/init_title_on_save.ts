import {title_on} from "./title_on.ts";

export function init_title_on_save() {
	let title_save=localStorage["title_save_data"];
	if(!title_save) title_save=localStorage["title_save_data"]='{"value":false}';
	title_on.value=JSON.parse(title_save).value;
}
