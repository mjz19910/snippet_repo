import {YtdPlayerElement} from "../elements/interfaces/YtdPlayerElement.ts";
import {element_map} from "../event/element_map.ts";

declare global {
	export interface Window {
		ytd_player?: HTMLElement|null;
	}
}

let ytd_player: {value: YtdPlayerElement;};

export function on_ytd_player(element: HTMLElement) {
	const element_id="ytd-player";
	console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	const any_element: unknown=element;
	const expected_element: YtdPlayerElement=any_element as YtdPlayerElement;
	ytd_player.value=expected_element;
	window.ytd_player=element;
}
