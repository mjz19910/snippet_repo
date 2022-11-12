import {FunctionBox} from "./FunctionBox.js"
import {NewableFunctionConstructor} from "./NewableFunctionConstructor.js"

export type FunctionConstructorFactory=(box_value: NewableFunctionConstructor) => FunctionBox
