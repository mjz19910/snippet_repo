/**
 * @param {number | undefined} timeout
 * @param {TimerHandler} a
 */
export function promise_set_timeout(timeout, a) {
	setTimeout(a, timeout);
}
