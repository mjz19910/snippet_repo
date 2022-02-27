import {IBox as IBox} from "./IBox";
import {BoxTemplate} from "./mod";

export class PromiseBox extends BoxTemplate<Promise<IBox>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
