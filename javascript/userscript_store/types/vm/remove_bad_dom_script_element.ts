import {remove_bad_dom_script_element_callback} from "./remove_bad_dom_script_element_callback"

export function remove_bad_dom_script_element(): void {
	Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback)
}
