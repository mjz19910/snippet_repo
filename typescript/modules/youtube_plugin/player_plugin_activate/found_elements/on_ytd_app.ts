import {ytd_app} from "../elements/ytd_app"
import {element_map} from "../event/element_map"
import {YtdAppElement} from "../types/YtdAppElement"

export function on_ytd_app(element: HTMLElement) {
	const element_id="ytd-app"
	console.log(`on ${element_id}`)
	element_map.set(element_id,element)
	let any_element: any=element
	let expected_element: YtdAppElement=any_element
	ytd_app.value=expected_element
	window.ytd_app=element
}
