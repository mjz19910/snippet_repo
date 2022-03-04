import {BoxTemplate} from "../BoxTemplate";
import {Box} from "../Box";

export class PromiseBox extends BoxTemplate<"promise_box", Promise<Box>> {
	type: "promise_box" = "promise_box";
	inner_type: 'Promise<Box>' = 'Promise<Box>';
	await_type: "Box" = "Box";
	readonly m_verify_name="PromiseBox";
	verify_name(name:"PromiseBox") {
		if(this.m_verify_name !== 'PromiseBox' || name !== 'PromiseBox'){
			throw new Error("Bad box");
		}
	}
}
