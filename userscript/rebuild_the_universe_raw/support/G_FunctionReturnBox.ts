import {ArrayBox} from "./ArrayBox.js";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.js";
import {EmptyArrayBox} from "./EmptyArrayBox.js";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox.js";

export type G_FunctionReturnBox=
	|CSSStyleSheetInitBox
	|EmptyArrayBox
	|ArrayBox
	|InstructionTypeArrayBox
	;
;
