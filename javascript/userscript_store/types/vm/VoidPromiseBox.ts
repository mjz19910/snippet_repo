import {Box} from "./box/mod";

export class VoidPromiseBox extends Box<Promise<void>> {
	type: "promise" = "promise";
	return_type: null = null;
	await_type: null = null;
	promise_return_type_special: 'void_type' = 'void_type';
}
