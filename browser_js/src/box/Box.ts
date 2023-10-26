import {ArrayBox} from "./ArrayBox.ts";
import {AsyncFunctionBox} from "./AsyncFunctionBox.ts";
import {BoxWithPropertiesIsBox} from "./BoxWithPropertiesIsBox.ts";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.ts";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox.ts";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.ts";
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox.ts";
import {DocumentBox} from "./DocumentBox.ts";
import {DomElementBox} from "./DomElementBox.ts";
import {EmptyArrayBox} from "./EmptyArrayBox.ts";
import {FunctionBox} from "./FunctionBox.ts";
import {FunctionConstructorBox} from "./FunctionConstructorBox.ts";
import {GlobalThisBox} from "./GlobalThisBox.ts";
import {IndexBox} from "./IndexBox.ts";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox.ts";
import {InstructionTypeBox} from "./InstructionTypeBox.ts";
import {MediaListBox} from "./MediaListBox.ts";
import {NewableFunctionBox} from "./NewableFunctionBox.ts";
import {NewableInstancePackBox} from "./NewableInstancePackBox.ts";
import {NewableInstancePackObjectBox} from "./NewableInstancePackObjectBox.ts";
import {NodeBox} from "./NodeBox.ts";
import {NullBox} from "./NullBox.ts";
import {NumberBox} from "./NumberBox.ts";
import {ObjectBox} from "./ObjectBox.ts";
import {PromiseBox} from "./PromiseBox.ts";
import {RawBoxes} from "./RawBoxes.ts";
import {RealVoidBox} from "./RealVoidBox.ts";
import {StackVMBox} from "./StackVMBox.ts";
import {StringBox} from "./StringBox.ts";
import {VoidBox} from "./VoidBox.ts";
import {VoidPromiseBox} from "./VoidPromiseBox.ts";
import {WindowBox} from "./WindowBox.ts";

export type Box=
	|RawBoxes
	|NumberBox
	|StringBox
	// function result
	|CSSStyleSheetInitBox
	// array
	|EmptyArrayBox
	|ArrayBox
	|InstructionTypeArrayBox
	// constructor function
	|CSSStyleSheetConstructorBox
	// function
	|FunctionBox
	|NewableFunctionBox
	|NewableInstancePackBox
	|AsyncFunctionBox
	|FunctionConstructorBox
	// return type
	|CSSStyleSheetPromiseBox
	// global
	|GlobalThisBox
	|WindowBox
	|DocumentBox
	// object instances
	|StackVMBox
	|NodeBox
	|CSSStyleSheetBox
	|MediaListBox
	// StackVM
	|InstructionTypeBox
	// object
	|NullBox
	|IndexBox
	|ObjectBox
	// promise types
	|VoidPromiseBox
	|PromiseBox
	// No value (Void)
	|VoidBox
	|RealVoidBox
	// Box with stuff
	|BoxWithPropertiesIsBox
	// Generic boxes
	|NewableInstancePackObjectBox
	|DomElementBox
	|never;

