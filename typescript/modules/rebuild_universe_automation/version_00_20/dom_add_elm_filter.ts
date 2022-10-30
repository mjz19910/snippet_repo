import {do_dom_filter} from "./do_dom_filter"

export function dom_add_elm_filter(elm: HTMLScriptElement) {
	if(elm&&elm.nodeName==="SCRIPT") {
		if(!elm.src) {
			console.log(elm)
			return true
		}
		if(elm.src&&new URL(elm.src).origin===location.origin) {
			do_dom_filter()
			return true
		}
		return false
	}
	return true
}
