import {element_map,ytd_page_manager} from "./youtube_plugin.user"
import {YtdPageManagerElement} from "./YtdPageManagerElement"

export function on_ytd_page_manager(element: HTMLElement) {
	const element_id="ytd-page-manager"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	let any_element: any=element
	let expected_element: YtdPageManagerElement=any_element
	ytd_page_manager.value=expected_element
	window.ytd_page_manager=element
}
