import {Boxed as Boxed} from "./Boxed";
import {Box} from "./box/mod";

export class PromiseBox extends Box<Promise<Boxed>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
