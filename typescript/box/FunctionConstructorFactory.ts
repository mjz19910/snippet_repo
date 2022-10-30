import {FunctionBox} from "./FunctionBox"
import {NewableFunctionConstructor} from "./NewableFunctionConstructor"

export type FunctionConstructorFactory=(box_value: NewableFunctionConstructor) => FunctionBox
