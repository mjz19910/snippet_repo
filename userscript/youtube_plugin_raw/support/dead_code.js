	/** @type {<T, U>(v1:T, v2: T|U)=>NonNullable<T>} */
export function default_from(v1,v2) {
	if(v1) {
		return v1;
	}
	let res=any_o(v2,v1);
	if(res===void 0||res===null) throw new Error("Not null");
	return res;
}

/** @template T @arg {T} e @returns {T} */
export function any(e) {
	return e;
}

/**
 * @param {(arg0: [target: any, thisArg: any, argArray: any[]]) => void} callback
 * @param {any} value
 */
export function create_proxy(value,callback) {
	return new Proxy(value,{
		apply(...arr) {
			return callback(arr);
		}
	});
}


const LOGGING_LEVEL=1;
/**
 * @param {number} logging_level
 * @param {string} logger_format
 * @param {any[]} logger_args
 */
export function log_if_level(logging_level,logger_format,...logger_args) {
	if(logging_level>LOGGING_LEVEL) {
		console.log(logger_format,...logger_args);
	}
}

export {};
