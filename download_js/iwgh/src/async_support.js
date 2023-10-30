export const global_abort = new AbortController();

export function delay(ms) {
	return new Promise(function (accept, reject) {
		const signal = global_abort.signal;
		const abort = () => {
			clearTimeout(interval);
			reject(signal.reason);
		};
		signal.addEventListener("abort", abort, { once: true });
		const done = () => {
			signal.removeEventListener("abort", abort);
		};
		const complete = () => {
			done();
			accept();
		};
		const interval = setTimeout(complete, ms);
	});
}
