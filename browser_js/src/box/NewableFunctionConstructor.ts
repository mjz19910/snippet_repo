import {Box} from "./Box.ts";
import {FunctionInstance} from "./FunctionInstance.ts";

export interface NewableFunctionConstructor {
	make_new: new (...a: Box[]) => FunctionInstance
}
