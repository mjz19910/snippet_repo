export function reload_if_def(obj:{ [x: string]: any; },key:string) {
	if(obj[key]) {
		location.reload()
		document.body.innerHTML=""
		document.head.innerHTML=""
		document.documentElement.outerHTML=""
		return true
	}
	return false
}
