import {NewableFunctionBox} from "../NewableFunctionBox";
import {CallableReturnPromiseBox} from "./CallableReturnPromiseBox";
import {FunctionReturnsVoidPromiseBox} from "./CallableReturnsVoidPromiseBox";
import {FunctionBox} from "./FunctionBox";

export type FunctionBoxes = FunctionBox | NewableFunctionBox | FunctionReturnsVoidPromiseBox | CallableReturnPromiseBox;
