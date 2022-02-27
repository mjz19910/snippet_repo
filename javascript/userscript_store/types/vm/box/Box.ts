import ArrayBox from "./ArrayBox";
import PromiseResultBox from "./PromiseResultBox";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import CSSStyleSheetConstructorBox from "./CSSStyleSheetConstructorBox";
import CSSStyleSheetInitBox from "./CSSStyleSheetInitBox";
import CSSStyleSheetPromiseBox from "./CSSStyleSheetPromiseBox";
import EmptyArrayBox from "./EmptyArrayBox";
import FunctionBox from "./FunctionBox";
import GlobalThisBox from "./GlobalThisBox";
import IndexBox from "./IndexBox";
import InstructionTypeArrayBox from "./InstructionTypeArrayBox";
import MediaListBox from "./MediaListBox";
import NewableFunctionBox from "./NewableFunctionBox";
import NodeBox from "./NodeBox";
import ObjectBox from "./ObjectBox";
import Primitives from "../Primitives";
import PromiseBox from "./PromiseBox";
import {StackVMBox} from "./StackVMBox";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";
import {VoidPromiseBox} from "./VoidPromiseBox";

type Box =
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
export default Box;