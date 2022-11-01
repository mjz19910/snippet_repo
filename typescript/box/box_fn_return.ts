import {FunctionBox} from "./FunctionBox.js"
import {Box} from "./Box.js"
import {NewableFunctionConstructor} from "./NewableFunctionConstructor.js"

export function box_fn_return(box_value: NewableFunctionConstructor): FunctionBox {
	return new FunctionBox((...a: Box[]) => new FunctionBox(new box_value(...a)))
}
