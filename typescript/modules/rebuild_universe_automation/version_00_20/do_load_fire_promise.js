/**@arg {(value: any) => void} promise_accept */
export function do_load_fire_promise(promise_accept) {
	document.firstChild?.remove();
	promise_accept(null);
}
