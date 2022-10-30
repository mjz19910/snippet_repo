import {remove_bad_dom_script_element_callback} from "./remove_bad_dom_script_element_callback"

export function do_dom_filter() {
	Array.prototype.forEach.call(document.querySelectorAll("script"),remove_bad_dom_script_element_callback)
}
