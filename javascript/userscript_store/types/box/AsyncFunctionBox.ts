import {Box} from "./Box"
import {BoxTemplate} from "./BoxTemplate"
import {BoxVerify} from "./BoxVerify"
import {PromiseBox} from "./PromiseBox"
export class AsyncFunctionBox
	extends BoxTemplate<"function_box",(...a: Box[]) => Promise<Box>>
	implements BoxVerify<AsyncFunctionBox,"AsyncFunctionBox">
{
	type: "function_box"="function_box"
	return_type: "promise_box"="promise_box"
	await_type: "Box"="Box"
	wrap_call(target_this: Box,...args: Box[]): Box {
		let ret=this.value.apply(target_this,args)
		return new PromiseBox(ret)
	}
	readonly m_verify_name="AsyncFunctionBox"
	verify_name(name: "AsyncFunctionBox") {
		return this.m_verify_name==="AsyncFunctionBox"&&name==="AsyncFunctionBox"
	}
}
