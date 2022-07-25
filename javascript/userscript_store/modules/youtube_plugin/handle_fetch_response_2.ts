import {bind_promise_handler} from "./bind_promise_handler"

export function handle_fetch_response_2(request_info: RequestInfo|URL,ov: Promise<string>): Promise<string> {
	let vv: Promise<string>={
		then<TResult1,TResult2>(onfulfilled: (value: string)=>TResult1 | PromiseLike<TResult1>,onrejected: (reason: any)=>TResult2 | PromiseLike<TResult2>): Promise<TResult1|TResult2> {
			return ov.then<TResult1, TResult2>(bind_promise_handler(request_info,onfulfilled,onrejected))
		},
		catch<TResult>(onrejected?: ((reason: any) => TResult|PromiseLike<TResult>)|null|undefined): Promise<any> {
			return ov.catch(onrejected)
		},
		finally(onfinally?: (() => void)|null) {
			return ov.finally(onfinally)
		},
		[Symbol.toStringTag]: "Promise",
	}
	return vv
}
