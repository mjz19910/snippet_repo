function do_async_wait(delay: number) {
	function promise_exec(a: TimerHandler) {
		setTimeout(a, delay);
	}
	return new Promise(promise_exec);
}
