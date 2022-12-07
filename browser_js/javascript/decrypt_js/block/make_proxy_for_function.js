import {skip_log} from "./skip_log.js";

/** @type {any[][]} */
export let messages=[];

export function make_proxy_for_function() {
	Function.prototype.bind=new Proxy(Function.prototype.bind,{
		apply(target,thisValue,parameters) {
			if(!skip_log.value) {
				messages.push(["Function bind",new Error(),target,thisValue,...parameters]);
			}
			return Reflect.apply(target,thisValue,parameters);
		}
	});
}
