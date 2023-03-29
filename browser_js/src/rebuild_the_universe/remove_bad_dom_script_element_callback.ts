import {seen_elements} from "./seen_elements.js";

export function remove_bad_dom_script_element_callback(e: HTMLScriptElement) {
	if(seen_elements.has(e))
		return;
	seen_elements.add(e);
	if(!e.src)
		return;
	if(e.src.includes("analytics.js")&&e.src.includes("google")) {
		e.remove();
		return;
	}
	if(e.src.includes("platform.js")) {
		e.remove();
		return;
	}
	//spell:disable-next-line
	if(e.src.indexOf("opentracker")>-1) {
		e.remove();
		return;
	}
	//spell:disable-next-line
	if(e.src.includes("pagead/js/adsbygoogle.js")) {
		e.remove();
		return;
	}
	if(new URL(e.src).origin!=location.origin)
		return;
	if(e.src.indexOf("ads")>-1||e.src.indexOf("track")>-1) {
		e.remove();
		return;
	}
}
