export function remove_bad_dom_script_element() {
	function remove_element_callback(e: {src: string | string[] | URL; remove: () => void;}) {
		if(!e.src)
			return;
		if(e.src instanceof URL) {
			if(e.src.origin != location.origin)
				return;
			if(e.src.pathname.indexOf("ads") > -1 || e.src.pathname.indexOf("track") > -1) {
				e.remove();
			}
			return;
		}
		if(typeof e.src === 'string') {
			if(new URL(e.src).origin != location.origin)
				return;
			if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
				e.remove();
			}
		}
	}
	Array.prototype.forEach.call(document.querySelectorAll("script"), remove_element_callback);
}
