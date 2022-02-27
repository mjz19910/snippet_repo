import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox";
import {GlobalThisBox} from "./GlobalThisBox";
import {PromiseBox} from "./PromiseBox";
import {PromiseTypeBoxes} from "./PromiseTypeBoxes";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {ArrayBox} from "./ArrayBox";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox";
import {FunctionBox} from "./FunctionBox";
import {NewableFunctionBox} from "./NewableFunctionBox";
import {FunctionReturnsVoidPromiseBox} from "./CallableReturnsVoidPromiseBox";
import {CallableReturnPromiseBox} from "./CallableReturnPromiseBox";
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox";
import {MediaListBox} from "./MediaListBox";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {NodeBox} from "./NodeBox";
import {StackVMBox} from "./StackVMBox";
import {IndexedFnBox} from "./IndexedFunctionBox";
import {IndexedObject} from "../index_access/IndexedObject";
import {ObjectBox} from "./ObjectBox";

type ValueBoxes =
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
FunctionReturnsVoidPromiseBox |
CallableReturnPromiseBox |
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
IndexedObject |
ObjectBox |
// promise box
PromiseBox |
// promise types
PromiseTypeBoxes |
// No value (Void)
VoidBox;

export default ValueBoxes;
