export function do_load_fire_promise(promise_accept:(value: any) => void) {
	document.firstChild?.remove()
	promise_accept(null)
}
