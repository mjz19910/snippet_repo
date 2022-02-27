import {ArgumentTypeBoxes} from "./ArgumentTypeBoxes";
import {ArrayBoxes} from "./ArrayBoxes";
import {ConstructorBoxes} from "./ConstructorBoxes";
import {FunctionBoxes} from "./FunctionBoxes";
import {FunctionReturnBoxes} from "./FunctionReturnBoxes";
import {GlobalThisBox} from "./GlobalThisBox";
import {InstanceBoxes} from "./InstanceBoxes";
import {ObjectBoxes} from "./ObjectBoxes";
import {PromiseBox} from "./PromiseBox";
import {PromiseTypeBoxes} from "../PromiseTypeBoxes";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";

type ValueBoxes =
ArgumentTypeBoxes |
ArrayBoxes |
ArrayBoxes |
ConstructorBoxes |
FunctionBoxes |
FunctionReturnBoxes |
GlobalThisBox |
InstanceBoxes |
ObjectBoxes |
PromiseBox |
PromiseTypeBoxes |
WindowBox |
// No value
VoidBox;

export default ValueBoxes;
