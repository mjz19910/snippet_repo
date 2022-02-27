import {InstructionCall} from "./instruction/general/InstructionCall";
import Primitives from "./Primitives";
type T=|0;
// --- Misc ---
type SkipItem0_t<T extends [f: string, ...v: any[]], X> = T extends [X, ...infer U] ? U : T[1];
export type SkipItem0<T extends [f: any, ...v: any[]]> = SkipItem0_t<T, T[0]>;
export {
	InstructionCall,
	Primitives
}