import {ytd_app} from "../elements/ytd_app.js";
import {element_map} from "../event/element_map.js";
import {YtdAppElement} from "../elements/YtdAppElement.js";

declare global {
	interface Window {
		ytd_app?: HTMLElement;
	}
}

export function on_ytd_app(element: HTMLElement) {
	const element_id="ytd-app";
	console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	let element_=YtdAppElement.cast(element);
	ytd_app.value=element_;
	window.ytd_app=element_;
}
