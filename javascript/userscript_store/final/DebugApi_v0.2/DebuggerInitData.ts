import {FunctionCallbackArgs} from "./FunctionCallbackArgs";
import {ClassCallbackArgs} from "./ClassCallbackArgs";

type ClassCallbackFunction=(v: ClassCallbackArgs) => any;
type ApiCallbackFunction=(v:FunctionCallbackArgs) => {};

type ClassData = ['class', ClassCallbackFunction, ClassCallbackArgs];

type FunctionData = ['function', ApiCallbackFunction, FunctionCallbackArgs];

export type ApiData = ClassData | FunctionData;
