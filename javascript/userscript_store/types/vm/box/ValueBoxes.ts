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
import {FunctionReturnsVoidPromiseBox as ResultVoidPromiseBox} from "./ResultVoidPromiseBox";
import {CallableReturnPromiseBox as PromiseResultBox} from "./CallableReturnPromiseBox";
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox";
import {MediaListBox} from "./MediaListBox";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {NodeBox} from "./NodeBox";
import {StackVMBox} from "./StackVMBox";
import {IndexedFnBox} from "./IndexedFunctionBox";
import {IndexBox} from "../index_access/IndexedObject";
import {ObjectBox} from "./ObjectBox";
import {VoidPromiseBox} from "./VoidPromiseBox";

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
// promise
PromiseBox |
PromiseResultBox |
// void (Void)
VoidBox |
// Promise<void>
VoidPromiseBox;

export default ValueBoxes;
