import {Box} from "./Box";
import FunctionBox from "./FunctionBox";
import {FunctionInstance} from "./FunctionInstance";

export type FunctionConstructorFactory = (box_value: new (...a: Box[]) => FunctionInstance) => FunctionBox;
