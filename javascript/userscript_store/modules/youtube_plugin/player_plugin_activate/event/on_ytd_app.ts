import {YtdAppElement} from "modules/youtube_plugin/elements/types/YtdAppElement"
import {ytd_app} from "modules/youtube_plugin/elements/ytd_app"
import {element_map} from "modules/youtube_plugin/youtube_plugin.user"

export function on_ytd_app(element: HTMLElement) {
	const element_id="ytd-app"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	let any_element: any=element
	let expected_element: YtdAppElement=any_element
	ytd_app.value=expected_element
	window.ytd_app=element
}
