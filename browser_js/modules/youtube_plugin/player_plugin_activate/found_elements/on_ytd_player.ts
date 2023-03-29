import {element_map} from "../event/element_map.js";

declare global {
	interface Window {
		ytd_player?: HTMLElement|null;
	}
}

export function on_ytd_player(element: HTMLElement) {
	const element_id="ytd-player";
	console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	let any_element: any=element;
	let expected_element: YtdPlayerElement=any_element;
	ytd_player.value=expected_element;
	window.ytd_player=element;
}
