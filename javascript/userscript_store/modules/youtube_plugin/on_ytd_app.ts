import {element_map,ytd_app} from "./youtube_plugin.user"
import {YtdAppElement} from "./YtdAppElement"

export function on_ytd_app(element: HTMLElement) {
	const element_id="ytd-app"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	let any_element: any=element
	let expected_element: YtdAppElement=any_element
	ytd_app.value=expected_element
	window.ytd_app=element
}
