import {FunctionBox} from "../mod/FunctionBox.js";
import {NewableFunctionConstructor} from "../mod/NewableFunctionConstructor.js";

export interface FunctionConstructorFactory {factory: (box_value: NewableFunctionConstructor) => FunctionBox;}
