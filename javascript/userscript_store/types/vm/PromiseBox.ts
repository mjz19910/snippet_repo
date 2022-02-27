import {Boxed as Boxed} from "./Boxed";
import {Box} from "./Box";

export class PromiseBox extends Box<Promise<Boxed>> {
	type: "promise" = "promise";
	await_type: "value" = "value";
}
