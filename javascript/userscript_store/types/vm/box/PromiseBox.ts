import {Box as Box} from "./Box";
import {IBoxImpl} from "./mod";

export class PromiseBox extends IBoxImpl<Promise<Box>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
