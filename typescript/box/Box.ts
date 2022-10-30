import {ArrayBox} from "./ArrayBox"
import {AsyncFunctionBox} from "./AsyncFunctionBox"
import {BoxWithPropertiesIsBox} from "./BoxWithPropertiesIsBox"
import {CSSStyleSheetBox} from "./CSSStyleSheetBox"
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox"
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox"
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox"
import {DocumentBox} from "./DocumentBox"
import {EmptyArrayBox} from "./EmptyArrayBox"
import {FunctionBox} from "./FunctionBox"
import {FunctionConstructorBox} from "./FunctionConstructorBox"
import {GlobalThisBox} from "./GlobalThisBox"
import {Primitives} from "./helper/Primitives"
import {IndexBox} from "./IndexBox"
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox"
import {InstructionTypeBox} from "./InstructionTypeBox"
import {MediaListBox} from "./MediaListBox"
import {NewableFunctionBox} from "./NewableFunctionBox"
import {NewableInstancePackObjectBox} from "./NewableInstancePackObjectBox"
import {NodeBox} from "./NodeBox"
import {ObjectBox} from "./ObjectBox"
import {PromiseBox} from "./PromiseBox"
import {RealVoidBox} from "./RealVoidBox"
import {StackVMBox} from "./StackVMBox"
import {TemporaryBox} from "./temporary_box/TemporaryBox"
import {VoidBox} from "./VoidBox"
import {VoidPromiseBox} from "./VoidPromiseBox"
import {WindowBox} from "./WindowBox"

export type Box=
	// function result
	CSSStyleSheetInitBox|
	// array
	EmptyArrayBox|
	ArrayBox|
	InstructionTypeArrayBox|
	// constructor function
	CSSStyleSheetConstructorBox|
	// function
	FunctionBox|
	NewableFunctionBox|
	AsyncFunctionBox|
	FunctionConstructorBox|
	// return type
	CSSStyleSheetPromiseBox|
	// global
	GlobalThisBox|
	WindowBox|
	DocumentBox|
	// object instances
	StackVMBox|
	NodeBox|
	CSSStyleSheetBox|
	MediaListBox|
	// StackVM
	InstructionTypeBox|
	// object
	// hard to box returns from normal js (can't find the index sig easily as any object would match)
	IndexBox|
	ObjectBox|
	// promise types
	VoidPromiseBox|
	PromiseBox|
	// primitive
	Primitives|
	null|
	// No value (Void)
	VoidBox|
	RealVoidBox|
	// Temporary box for when stuff is asserted to be true (ie, typeof value_to_box === "function")
	TemporaryBox|
	// Box with stuff
	BoxWithPropertiesIsBox|
	// Generic boxes
	NewableInstancePackObjectBox
