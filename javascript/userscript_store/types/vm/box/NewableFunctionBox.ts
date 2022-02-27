import {NewableFunction} from "../NewableFunction";
import {Box} from "./mod";

export class NewableFunctionBox extends Box<NewableFunction> {
	type: "constructor_box" = "constructor_box";
	from: "typescript" = "typescript";
	instance_type: null = null;
	constructor_type: "NewableFunction" = "NewableFunction";
}
