import {BoxTemplate} from "./BoxTemplate"
import {Box} from "./Box"
import {BoxVerify} from "./BoxVerify"
export class PromiseBox extends BoxTemplate<"promise_box", Promise<Box>> implements BoxVerify<PromiseBox, "PromiseBox"> {
	type: "promise_box" = "promise_box"
	inner_type: 'Promise<Box>' = 'Promise<Box>'
	await_type: "Box" = "Box"
	readonly m_verify_name="PromiseBox"
	verify_name(name: "PromiseBox") {
		return this.m_verify_name === "PromiseBox" && name === "PromiseBox"
	}
}
