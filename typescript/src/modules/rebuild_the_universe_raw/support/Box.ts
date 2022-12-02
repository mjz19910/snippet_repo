import {AsyncFunctionBox} from "./AsyncFunctionBox.js";
import {FunctionBox} from "./FunctionBox.js";
import {NodeBox} from "./NodeBox.js";
import {NumberBox} from "./NumberBox.js";
import {ObjectBox} from "./ObjectBox.js";
import {PromiseBox} from "./PromiseBox.js";
import {StringBox} from "./StringBox.js";
import {VoidBox} from "./VoidBox.js";
import {WindowBox} from "./WindowBox.js";
import {StackVMBox} from "./StackVMBox.js";
import {FunctionConstructorBox} from "./FunctionConstructorBox.js";

export type Box=
	NumberBox|
	WindowBox|
	ObjectBox|
	VoidBox|
	AsyncFunctionBox|
	FunctionBox|
	PromiseBox|
	StringBox|
	NodeBox|
	StackVMBox|
	FunctionConstructorBox|
	never;
