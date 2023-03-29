import {title_text_overlay_enabled} from "../title_text_overlay_enabled.js";
import {fix_offset} from "../fix_offset.js";
import {title_text_overlay_update} from "../title_text_overlay_update.js";

export function on_yt_action(event: CustomEvent<{actionName: "yt-fullscreen-change-action"; args: [boolean];}>|CustomEvent<{actionName: string;}>) {
	let {detail}=event;
	function is_yt_fullscreen_change_action(detail: any): detail is {actionName: "yt-fullscreen-change-action",args: [boolean];} {return detail.actionName==="yt-fullscreen-change-action";}
	if(is_yt_fullscreen_change_action(detail)) {
		let {args}=detail;
		fix_offset();
		setTimeout(fix_offset);
		title_text_overlay_enabled.value=!args[0];
		title_text_overlay_update();
	}
}
