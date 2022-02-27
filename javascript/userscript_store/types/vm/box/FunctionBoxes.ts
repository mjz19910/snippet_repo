import {NewableFunctionBox} from "./NewableFunctionBox";
import {CallableReturnPromiseBox} from "./CallableReturnPromiseBox";
import {FunctionReturnsVoidPromiseBox} from "./ResultVoidPromiseBox";
import {FunctionBox} from "./FunctionBox";

export type FunctionBoxes = FunctionBox | NewableFunctionBox | FunctionReturnsVoidPromiseBox | CallableReturnPromiseBox;
