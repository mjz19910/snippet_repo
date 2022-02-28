import {FunctionCallbackArgs} from "./FunctionCallbackArgs";
import {ClassCallbackArgs} from "./ClassCallbackArgs";

export type DebuggerInitData = ['class', (v: ClassCallbackArgs) => any, ClassCallbackArgs] | ['function', (v: FunctionCallbackArgs) => any, FunctionCallbackArgs];
