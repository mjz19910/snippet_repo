/** @param {NS} ns @arg {string[]} arr_disabled @arg {string} fn_key */
export function do_disable(ns, arr_disabled, fn_key) {
	if (arr_disabled.includes(fn_key)) return;
	ns.disableLog(fn_key);
	arr_disabled.push(fn_key);
}