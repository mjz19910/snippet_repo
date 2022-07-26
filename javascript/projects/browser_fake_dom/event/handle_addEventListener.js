/**
 * @param {{ [x: string]: { func: any; op: any; }[]; }} wind_event_lis
 */
export function handle_addEventListener(wind_event_lis) {
	return function(/** @type {string | number} */ name, /** @type {any} */ func, /** @type {any} */ options) {
		console.log("addEventListener")
		console.log('  - ',name)
		if(!wind_event_lis[name]) {
			wind_event_lis[name]=[]
		}
		wind_event_lis[name].push({
			func: func,
			op: options
		})
	}
}
