import {FunctionBox} from "../zz_broken/FunctionBox.js"
import {NewableFunctionConstructor} from "../NewableFunctionConstructor.js"

export interface FunctionConstructorFactory {factory: (box_value: NewableFunctionConstructor) => FunctionBox}
