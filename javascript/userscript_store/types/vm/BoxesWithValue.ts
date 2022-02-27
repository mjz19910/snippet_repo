import {VMObjectTypes} from "./VMObjectTypes";
import {FunctionBoxes} from "./FunctionBoxes";
import {PromiseBox} from "./PromiseBox";
import {GlobalThisBox} from "./GlobalThisBox";
import {WindowBox} from "./WindowBox";
import {FunctionReturnBoxes} from "./FunctionReturnBoxes";
import {PromiseTypeBoxes} from "./PromiseTypeBoxes";
import {ArgumentTypeBoxes} from "./ArgumentTypeBoxes";
import {ConstructorBoxes} from "./ConstructorBoxes";
import {InstanceBoxes} from "./InstanceBoxes";
import {ArrayBoxes} from "./ArrayBoxes";

export type BoxesWithValue =
	ArrayBoxes |
	VMObjectTypes |
	InstanceBoxes |
	PromiseBox |
	ConstructorBoxes |
	ArgumentTypeBoxes |
	GlobalThisBox |
	WindowBox |
	PromiseTypeBoxes |
	FunctionReturnBoxes |
	FunctionBoxes;
