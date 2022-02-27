function reload_if_def(obj: {[x: string]: any;}, key: string | number) {
	if(obj[key]) {
		document.body.innerHTML = "";
		document.head.innerHTML = "";
		debugger;
		setTimeout(() => location.reload());
		return true;
	}
	return false;
}
