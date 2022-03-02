/**
 * @param {{ [x: string]: any; }} obj
 * @param {string} key
 */
export function reload_if_def(obj, key) {
	if(obj[key]) {
		location.reload();
		document.body.innerHTML = "";
		document.head.innerHTML = "";
		document.documentElement.outerHTML = "";
		return true;
	}
	return false;
}
