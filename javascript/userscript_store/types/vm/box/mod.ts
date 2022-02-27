import {ArrayBox} from "./ArrayBox";
import {PromiseResultBox} from "./CallableReturnPromiseBox";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox";
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {FunctionBox} from "./FunctionBox";
import {GlobalThisBox} from "./GlobalThisBox";
import {IndexedFnBox} from "./IndexedFunctionBox";
import {IndexBox} from "../index_access/IndexedObject";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox";
import {MediaListBox} from "./MediaListBox";
import {NewableFunctionBox} from "./NewableFunctionBox";
import {NodeBox} from "./NodeBox";
import {ObjectBox} from "./ObjectBox";
import {Primitives} from "../Primitives";
import {PromiseBox} from "./PromiseBox";
import {StackVMBox} from "./StackVMBox";
import {TypeOfResult} from "../TypeOfResult";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";
import {VoidPromiseBox} from "./VoidPromiseBox";

export type Box =
// function result
CSSStyleSheetInitBox |
// array
EmptyArrayBox |
ArrayBox |
InstructionTypeArrayBox |
// constructor function
CSSStyleSheetConstructorBox |
// function
FunctionBox |
NewableFunctionBox |
PromiseResultBox |
// return type
CSSStyleSheetPromiseBox |
// global
GlobalThisBox |
WindowBox |
// object instances
StackVMBox |
NodeBox |
CSSStyleSheetBox |
MediaListBox |
// object
IndexedFnBox |
IndexBox |
ObjectBox |
// promise types
VoidPromiseBox |
PromiseBox |
// primitive
Primitives |
null |
// No value (Void)
VoidBox;

export class BoxTemplate<T> {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
	get_matching_typeof(to_match: TypeOfResult) {
		if(typeof this.value === to_match)
			return this;
		return null;
	}
}
