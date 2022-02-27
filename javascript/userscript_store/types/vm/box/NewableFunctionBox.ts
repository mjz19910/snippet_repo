import {NewableFunction} from "../NewableFunction";
import {BoxTemplate} from "./BoxTemplate";

export class NewableFunctionBox extends BoxTemplate<NewableFunction> {
	type: "constructor_box" = "constructor_box";
	arguments: "box[]"="box[]";
	return:"box"="box";
}
