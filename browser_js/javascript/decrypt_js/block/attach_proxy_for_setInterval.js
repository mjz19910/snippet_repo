import {console_log} from "../helper/console.js";

export function attach_proxy_for_setInterval() {
	globalThis.setInterval=new Proxy(globalThis.setInterval,{
		/** @arg {[ typeof setInterval, any, [ TimerHandler, number|undefined ] ]} arg0 */
		apply(...[,,[ha,ms]]) {
			console.log("set_interval ms",ms);
			if(typeof ha=='function') {
				let func=ha;
				return setTimeout(function() {
					console_log("timeout");
					func();
				},0);
			} else {
				console.log("handler is string");
				setTimeout(ha,0);
			}
			return -1;
		}
	});
}
