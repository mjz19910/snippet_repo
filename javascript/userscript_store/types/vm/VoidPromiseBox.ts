import {IBoxImpl} from "./box/mod";

export class VoidPromiseBox extends IBoxImpl<Promise<void>> {
	type: "promise" = "promise";
	return_type: null = null;
	await_type: null = null;
	promise_return_type_special: 'void_type' = 'void_type';
}
