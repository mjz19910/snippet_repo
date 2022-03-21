/**
 * @param {(...v:any[])=>any} setTimeout_orig
 */
export function intercept_setTimeoutAPI(setTimeout_orig) {
	/**
	 * @arg {(...args: any[]) => void} callback
	 * @param {number | undefined} delay_arg
	 * @arg {any[]} args
	 */
	function intercept_set_timeout(callback, delay_arg, ...args) {
		var d = setTimeout_orig(callback, delay_arg, ...args);
		console.log('setTimeout');
		if(delay_arg === void 0) {
			console.log("  - ", callback, 0);
		} else {
			console.log("  - ", callback, delay_arg);
		}
		return d;
	}
	return intercept_set_timeout;
}
