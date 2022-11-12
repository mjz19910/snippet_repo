import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class VoidPromiseBox
	extends BoxTemplate<"promise_box",Promise<void>>
	implements BoxVerify<VoidPromiseBox,"VoidPromiseBox">
{
	readonly type="promise_box"
	readonly inner_type: 'Promise<void>'='Promise<void>'
	readonly await_type=void 0
	readonly m_verify_name="VoidPromiseBox"
	verify_name(name: "VoidPromiseBox") {
		return this.m_verify_name==="VoidPromiseBox"&&name==="VoidPromiseBox"
	}
}
