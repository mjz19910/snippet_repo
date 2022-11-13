export function init_navigator_sendBeacon_plugin() {
	let navigator_sendBeacon=navigator.sendBeacon
	navigator.sendBeacon=function(...args) {
		if(typeof args[0]==='string'&&args[0].indexOf("/api/stats/qoe")>-1) {
			return true
		}
		console.log("send_beacon",args[0])
		return navigator_sendBeacon.call(this,...args)
	}
}
