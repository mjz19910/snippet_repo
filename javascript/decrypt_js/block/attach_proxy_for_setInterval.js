export function attach_proxy_for_setInterval() {
	let log_fn=console.log.bind(console);
	globalThis.setInterval=new Proxy(globalThis.setInterval,{
		/** @arg {[ typeof setInterval, any, [ TimerHandler, number | undefined ] ]} arg0 */
		apply(...[,,[ha,ms]]) {
			console.log("set_interval ms",ms);
			if(typeof ha=='function') {
				let func=ha;
				return setTimeout(function() {
					log_fn("timeout");
					func();
				},0);
			} else {
				console.log("handler is string");
				setTimeout(ha,0);
			}
		}
	});
}
