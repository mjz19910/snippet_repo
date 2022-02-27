import {NewableFunctionBox} from "./NewableFunctionBox";
import {CallableReturnPromiseBox} from "./CallableReturnPromiseBox";
import {CallableReturnsVoidPromiseBox} from "./CallableReturnsVoidPromiseBox";
import {FunctionBox} from "./FunctionBox";

export type FunctionBoxes = FunctionBox | NewableFunctionBox | CallableReturnsVoidPromiseBox | CallableReturnPromiseBox;
