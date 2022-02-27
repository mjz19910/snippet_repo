import {InstructionTypeArrayBox} from "../InstructionTypeArrayBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {ArrayBox} from "./ArrayBox";

/* --- VM Value (classes) ---
VMBoxedFunction, VMNewableFunction, VMBoxedCSSStyleSheetConstructor
VMCallableFunction, VMIndexedCallableValue, VMBoxedIndexedObjectValue
*/

export type ArrayBoxes = EmptyArrayBox | ArrayBox | InstructionTypeArrayBox;
