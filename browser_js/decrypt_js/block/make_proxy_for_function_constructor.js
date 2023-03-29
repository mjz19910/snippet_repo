export function make_proxy_for_function_constructor() {
	/** @arg {string} [fn_string] */
	Function.prototype.constructor=new Proxy(Function.prototype.constructor,{
		/** @arg {[Function,[string],Function]} arg0 */
		construct(...[func,args,new_target]) {
			let [fn_string]=args;
			if(fn_string==="debugger") {
				return function() {};
			} else {
				console.log("no make proto.fn",JSON.stringify(fn_string));
			}
			return Reflect.construct(func,args,new_target);
		}
	});
}
