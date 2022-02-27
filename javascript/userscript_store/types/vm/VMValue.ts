import {VMBoxedValues as ValueBoxes} from "./ValueBoxes";
import {VMPrimitiveValues as Primitives} from "./Primitives";

export type VMValue = ValueBoxes | Primitives | null;
