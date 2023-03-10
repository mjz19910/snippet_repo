import {Box} from "./z_done/box/Box.js";
import {FunctionInstance} from "./z_done/FunctionInstance.js";

export interface NewableFunctionConstructor {make_new: new (...a: Box[]) => FunctionInstance}
