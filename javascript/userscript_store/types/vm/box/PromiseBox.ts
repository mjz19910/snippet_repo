import {BoxTemplate} from "./BoxTemplate";
import Box from "./Box";

export class PromiseBox extends BoxTemplate<Promise<Box>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
