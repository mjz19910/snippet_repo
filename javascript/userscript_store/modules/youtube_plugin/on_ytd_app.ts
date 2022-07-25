import {any} from "./any"
import {element_map,ytd_app} from "./youtube_plugin.user"

/**
 * @param {HTMLElement} element
 */
export function on_ytd_app(element: HTMLElement) {
	const element_id="ytd-app"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	ytd_app=any(element)
	window.ytd_app=element
}
