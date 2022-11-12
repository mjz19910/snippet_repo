import {ytd_watch_flexy} from "../elements/ytd_watch_flexy.js";
import {element_map} from "../event/element_map.js";

declare global {
	interface Window {
		ytd_watch_flexy?: HTMLElement|null;
	}
}

export function on_ytd_watch_flexy(element: HTMLElement) {
	const element_id="ytd-watch-flexy";
	console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	ytd_watch_flexy.value=element;
	window.ytd_watch_flexy=element;
}
