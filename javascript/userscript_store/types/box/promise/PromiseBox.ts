import {BoxTemplate} from "../BoxTemplate";
import {Box} from "../Box";

export class PromiseBox extends BoxTemplate<"promise_box", Promise<Box>> {
	type: "promise_box" = "promise_box";
	inner_type: 'Promise<Box>' = 'Promise<Box>';
	await_type: "Box" = "Box";
}
