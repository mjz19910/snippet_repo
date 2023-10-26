import {FunctionBox} from "../mod/FunctionBox.ts";
import {NewableFunctionConstructor} from "../mod/NewableFunctionConstructor.ts";

export interface FunctionConstructorFactory {factory: (box_value: NewableFunctionConstructor) => FunctionBox;}
