import {FunctionBox} from "./FunctionBox"
import {Box} from "./Box"
import {NewableFunctionConstructor} from "./NewableFunctionConstructor"

export function box_fn_return(box_value: NewableFunctionConstructor): FunctionBox {
	return new FunctionBox((...a: Box[]) => new FunctionBox(new box_value(...a)))
}
