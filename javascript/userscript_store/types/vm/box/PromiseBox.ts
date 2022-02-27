import {IBox as IBox} from "./IBox";
import {Box} from "./mod";

export class PromiseBox extends Box<Promise<IBox>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
