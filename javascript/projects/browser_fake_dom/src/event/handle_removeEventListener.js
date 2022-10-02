/**
 * @param {{ [x: string]: any; }} wind_event_lis
 */
export function handle_removeEventListener(wind_event_lis) {
	return function(/** @type {string | number} */ name, /** @type {any} */ func, /** @type {any} */ options) {
		if(!wind_event_lis[name])
			return
		console.log("removeEventListener")
		console.log('  - ',name)
		var new_ar=wind_event_lis[name].filter((/** @type {{ func: any; op: any; }} */ e) => {
			return !(e.func==func&&e.op==options)
		})
		console.log("w_rl",name,new_ar.length)
		wind_event_lis[name]=new_ar
	}
}
