import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element.js"

export function dom_add_elm_filter(elm: HTMLScriptElement|null) {
	if(elm&&elm.nodeName==="SCRIPT") {
		if(!elm.src) {
			console.log(elm)
			return true
		}
		if(elm.src&&new URL(elm.src).origin===location.origin) {
			remove_bad_dom_script_element()
			return true
		}
		return false
	}
	return true
}
