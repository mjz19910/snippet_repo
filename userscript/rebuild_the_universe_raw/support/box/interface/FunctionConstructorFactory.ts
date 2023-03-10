import {FunctionBox} from "../FunctionBox.js";
import {NewableFunctionConstructor} from "../NewableFunctionConstructor.js";

export interface FunctionConstructorFactory {factory: (box_value: NewableFunctionConstructor) => FunctionBox;}
