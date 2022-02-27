import {Box as Box} from "./Box";
import {Box} from "./mod";

export class PromiseBox extends Box<Promise<Box>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
