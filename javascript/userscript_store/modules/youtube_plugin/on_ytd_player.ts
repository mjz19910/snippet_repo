import {any} from "./any"
import {element_map,ytd_player} from "./youtube_plugin.user"

/**
 * @param {HTMLElement} element
 */
export function on_ytd_player(element: HTMLElement) {
	const element_id="ytd-player"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	ytd_player=any(element)
	window.ytd_player=element
}
