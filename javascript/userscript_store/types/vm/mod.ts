// --- Misc ---
type SkipItem0_t<T extends [f: string, ...v: any[]], X> = T extends [X, ...infer U] ? U : T[1];
export type SkipItem0<T extends [f: any, ...v: any[]]> = SkipItem0_t<T, T[0]>;
export {FunctionBox} from "./box/FunctionBox";
export {IBox} from "./box/IBox";
export {IStackVM} from "./IStackVM";
export {InstructionType} from "./instruction/mod";
export {IndexedFnBox} from "./box/IndexedFunctionBox";
export {CSSStyleSheetConstructorBox} from "./box/CSSStyleSheetConstructorBox";
export {CSSStyleSheetBox} from "./box/CSSStyleSheetBox";
export {PromiseBox} from "./box/PromiseBox";