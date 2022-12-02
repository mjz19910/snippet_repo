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
import {NewableFunctionBox} from "./NewableFunctionBox.js";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox.js";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.js";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js";
import {ArrayBox} from "./ArrayBox.js";

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
	NewableFunctionBox|
	CSSStyleSheetConstructorBox|
	CSSStyleSheetInitBox|
	CSSStyleSheetBox|
	ArrayBox|
	never;
