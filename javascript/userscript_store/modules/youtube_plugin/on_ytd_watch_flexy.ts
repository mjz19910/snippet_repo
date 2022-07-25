import {any} from "./any"
import {element_map,ytd_watch_flexy} from "./youtube_plugin.user"

/**
 * @param {HTMLElement} element
 */
export function on_ytd_watch_flexy(element: HTMLElement) {
	const element_id="ytd-watch-flexy"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	ytd_watch_flexy=any(element)
	window.ytd_watch_flexy=element
}
