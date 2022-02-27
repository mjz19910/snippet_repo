import {BoxTemplate} from "./mod";

export class VoidPromiseBox extends BoxTemplate<Promise<void>> {
	type: "promise" = "promise";
	inner_type: 'Promise<void>' = 'Promise<void>';
	await_type: void = void 0;
}
