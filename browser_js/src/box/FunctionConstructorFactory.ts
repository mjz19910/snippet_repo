import {FunctionBox} from "./FunctionBox.ts"
import {NewableFunctionConstructor} from "./NewableFunctionConstructor.ts"

export interface FunctionConstructorFactory {
	factory: (box_value: NewableFunctionConstructor) => FunctionBox
}
