import {any} from "./any"
import {bind_promise_handler} from "./bind_promise_handler"

/**
 * @param {any} request_info
 * @arg {Promise<any>} ov
 * @return {Promise<any>}
 */
export function handle_fetch_response_2(request_info: RequestInfo|URL,ov: Promise<string>): Promise<string> {
	return any({
		then<T,TResult2=never>(onfulfilled?: ((value: T) => T|PromiseLike<T>)|null,onrejected?: ((reason: any) => TResult2|PromiseLike<TResult2>)|null): Promise<T|TResult2> {
			return ov.then(any(bind_promise_handler(request_info,onfulfilled,onrejected)))
		},
		catch<TResult=never>(onrejected?: ((reason: any) => TResult|PromiseLike<TResult>)|null|undefined): Promise<any> {
			return ov.catch(onrejected)
		},
		finally(onfinally?: (() => void)|null) {
			return ov.finally(onfinally)
		},
		[Symbol.toStringTag]: "Promise",
	})
}
