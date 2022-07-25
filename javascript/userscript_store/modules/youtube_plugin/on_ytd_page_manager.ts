import {any} from "./any"
import {element_map,ytd_page_manager} from "./youtube_plugin.user"

/**
 * @param {HTMLElement} element
 */
export function on_ytd_page_manager(element: HTMLElement) {
	const element_id="ytd-page-manager"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	ytd_page_manager.value=any(element)
	window.ytd_page_manager=element
}
