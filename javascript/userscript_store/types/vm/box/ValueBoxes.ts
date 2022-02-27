import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox";
import {ArrayBoxes} from "./ArrayBoxes";
import {ConstructorBoxes} from "./ConstructorBoxes";
import {FunctionBoxes} from "./FunctionBoxes";
import {FunctionReturnBoxes} from "./FunctionReturnBoxes";
import {GlobalThisBox} from "./GlobalThisBox";
import {InstanceBoxes} from "./InstanceBoxes";
import {ObjectBoxes} from "./ObjectBoxes";
import {PromiseBox} from "./PromiseBox";
import {PromiseTypeBoxes} from "./PromiseTypeBoxes";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";

type ValueBoxes =
// function result
CSSStyleSheetInitBox |
// array
ArrayBoxes |
// constructor function
ConstructorBoxes |
// function
FunctionBoxes |
// return type
FunctionReturnBoxes |
// global
GlobalThisBox |
WindowBox |
// object instances
InstanceBoxes |
// object
ObjectBoxes |
// promise box
PromiseBox |
// promise types
PromiseTypeBoxes |
// No value (Void)
VoidBox;

export default ValueBoxes;
