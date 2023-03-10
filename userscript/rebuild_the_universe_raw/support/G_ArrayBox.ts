import {ArrayBox} from "./ArrayBox.js";
import {EmptyArrayBox} from "./EmptyArrayBox.js";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox.js";


export type G_ArrayBox=ArrayBox|
	EmptyArrayBox|
	InstructionTypeArrayBox;
