import {BoxTemplate} from "../BoxTemplate";

export class VoidPromiseBox extends BoxTemplate<"promise_box", Promise<void>> {
	type: "promise_box" = "promise_box";
	inner_type: 'Promise<void>' = 'Promise<void>';
	await_type: void = void 0;
	readonly m_verify_name="VoidPromiseBox";
	verify_name(name:"VoidPromiseBox") {
		if(this.m_verify_name !== 'VoidPromiseBox' || name !== 'VoidPromiseBox'){
			throw new Error("Bad box");
		}
	}
}
