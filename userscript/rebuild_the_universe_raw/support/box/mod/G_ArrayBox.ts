import {ArrayBox} from "./ArrayBox.ts";
import {EmptyArrayBox} from "./EmptyArrayBox.ts";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox.ts";

export type G_ArrayBox=
	|ArrayBox
	|EmptyArrayBox
	|InstructionTypeArrayBox;
