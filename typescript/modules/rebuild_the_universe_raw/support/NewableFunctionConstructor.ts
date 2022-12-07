import {Box} from "../ns.js";
import {FunctionInstance} from "./FunctionInstance.js";

export interface NewableFunctionConstructor {
	make_new: new (...a: Box[]) => FunctionInstance
}
