import ArrayBox from "./ArrayBox";
import AsyncFunctionBox from "./PromiseResultBox";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import CSSStyleSheetConstructorBox from "./CSSStyleSheetConstructorBox";
import CSSStyleSheetInitBox from "./CSSStyleSheetInitBox";
import CSSStyleSheetPromiseBox from "./CSSStyleSheetPromiseBox";
import EmptyArrayBox from "./EmptyArrayBox";
import FunctionBox from "./FunctionBox";
import GlobalThisBox from "./GlobalThisBox";
import InstructionTypeArrayBox from "./InstructionTypeArrayBox";
import MediaListBox from "./MediaListBox";
import NewableFunctionBox from "./NewableFunctionBox";
import NodeBox from "./NodeBox";
import ObjectBox from "./ObjectBox";
import Primitives from "../Primitives";
import PromiseBox from "./PromiseBox";
import StackVMBox from "./StackVMBox";
import VoidBox from "./VoidBox";
import WindowBox from "./WindowBox";
import VoidPromiseBox from "./VoidPromiseBox";
import TemporaryBox from "./TemporaryBox";
import {DocumentBox} from "./DocumentBox";

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
	AsyncFunctionBox |
	// return type
	CSSStyleSheetPromiseBox |
	// global
	GlobalThisBox |
	WindowBox |
	DocumentBox |
	// object instances
	StackVMBox |
	NodeBox |
	CSSStyleSheetBox |
	MediaListBox |
	// object
	// hard to box returns from normal js (can't find the index sig easily as any object would match)
	// IndexBox |
	ObjectBox |
	// promise types
	VoidPromiseBox |
	PromiseBox |
	// primitive
	Primitives |
	null |
	// No value (Void)
	VoidBox |
	// Temporary box for when stuff is asserted to be true (ie, typeof value_to_box === "function")
	TemporaryBox;