import {ArrayBox} from "./ArrayBox.js";
import {AsyncFunctionBox} from "./AsyncFunctionBox.js";
import {BoxWithPropertiesIsBox} from "./BoxWithPropertiesIsBox.js";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox.js";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.js";
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox.js";
import {DocumentBox} from "./DocumentBox.js";
import {DomElementBox} from "./DomElementBox.js";
import {EmptyArrayBox} from "./EmptyArrayBox.js";
import {FunctionBox} from "./FunctionBox.js";
import {FunctionConstructorBox} from "./FunctionConstructorBox.js";
import {GlobalThisBox} from "./GlobalThisBox.js";
import {IndexBox} from "./IndexBox.js";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox.js";
import {InstructionTypeBox} from "./InstructionTypeBox.js";
import {MediaListBox} from "./MediaListBox.js";
import {NewableFunctionBox} from "./NewableFunctionBox.js";
import {NewableInstancePackBox} from "./NewableInstancePackBox.js";
import {NewableInstancePackObjectBox} from "./NewableInstancePackObjectBox.js";
import {NodeBox} from "./NodeBox.js";
import {NullBox} from "./NullBox.js";
import {NumberBox} from "./NumberBox.js";
import {ObjectBox} from "./ObjectBox.js";
import {PromiseBox} from "./PromiseBox.js";
import {RawBoxes} from "./RawBoxes";
import {RealVoidBox} from "./RealVoidBox.js";
import {StackVMBox} from "./StackVMBox.js";
import {StringBox} from "./StringBox.js";
import {VoidBox} from "./VoidBox.js";
import {VoidPromiseBox} from "./VoidPromiseBox.js";
import {WindowBox} from "./WindowBox.js";

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
	|never
	;
;

