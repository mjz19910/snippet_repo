/**
 * @param {(arg0: [target: any, thisArg: any, argArray: any[]]) => void} callback
 * @param {any} value
 */
export function create_proxy(value: any,callback: (arg0: [target: any,thisArg: any,argArray: any[]]) => void) {
	return new Proxy(value,{
		apply(...arr) {
			return callback(arr)
		}
	})
}
