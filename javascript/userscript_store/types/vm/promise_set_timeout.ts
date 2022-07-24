export function promise_set_timeout(timeout: number | undefined, a: TimerHandler) {
	setTimeout(a, timeout)
}
