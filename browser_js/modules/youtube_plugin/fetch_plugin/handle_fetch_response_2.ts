import {bind_promise_handler} from "./bind_promise_handler.ts"
import {RequestInfoExt} from "./RequestInfoExt.ts";

export function handle_fetch_response_2(request_info: RequestInfoExt,ov: Promise<string>): Promise<string> {
	return {
		then<TInput,TResult1,TResult2>(onfulfilled: (value: TInput) => TResult1|PromiseLike<TResult1>,onrejected: (reason: any) => TResult2|PromiseLike<TResult2>): Promise<TResult1|TResult2> {
			return ov.then<TResult1,TResult2>(bind_promise_handler(request_info,onfulfilled,onrejected))
		},
		catch<TResult>(onrejected?: ((reason: any) => TResult|PromiseLike<TResult>)|null|undefined): Promise<any> {
			return ov.catch(onrejected)
		},
		finally(onfinally?: (() => void)|null) {
			return ov.finally(onfinally)
		},
		[Symbol.toStringTag]: "Promise",
	}
}
