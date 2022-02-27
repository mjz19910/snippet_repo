import {Box as Box} from "./box/Boxed";
import {IBoxImpl} from "./box/mod";

export class PromiseBox extends IBoxImpl<Promise<Box>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
