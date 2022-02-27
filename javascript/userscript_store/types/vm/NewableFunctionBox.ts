import {NewableFunction} from "./NewableFunction";
import {IBoxImpl} from "./box/mod";

export class NewableFunctionBox extends IBoxImpl<NewableFunction> {
	type: "constructor_box" = "constructor_box";
	from: "typescript" = "typescript";
	instance_type: null = null;
	constructor_type: "NewableFunction" = "NewableFunction";
}
