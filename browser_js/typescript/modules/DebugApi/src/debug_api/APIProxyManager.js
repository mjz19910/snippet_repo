import {LoggingEventTarget} from "./LoggingEventTarget.js";

export class ApiProxyManager {
	/**
	 * @param {LoggingEventTarget} event_handler
	 */
	constructor(event_handler) {
		this.event_handler=event_handler;
	}
	/**
	 * @param {string} message_to_send
	 * @param {()=>void} function_value
	 */
	create_proxy_for_function(message_to_send,function_value) {
		let event_handler=this.event_handler;
		let obj={
			event_handler,
			/**@arg {[target: () => void, thisArg: any, argArray: any[]]} post_message_proxy_spread */
			apply(...post_message_proxy_spread) {
				this.event_handler.dispatchEvent({
					type: message_to_send,
					data: post_message_proxy_spread
				});
				let ret=Reflect.apply(...post_message_proxy_spread);
				return ret;
			}
		};
		return new Proxy(function_value,obj);
	}
	start_postMessage_proxy() {
		/**@type {any} */
		let win_post_message=window.postMessage;
		window.postMessage=this.create_proxy_for_function('postMessage_sent',win_post_message);
	}
}
