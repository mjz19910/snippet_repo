import {Box} from "./Box.js";
import {ObjectBoxesExtractImpl} from "./ObjectBoxesExtractImpl.js";
import {ObjectBoxesExcludeImpl2} from "./ObjectBoxesExcludeImpl2.js";
import {ExcludeObjectBoxPrimitives} from "./ExcludeObjectBoxPrimitives.js";

export type ObjectBoxes=ExcludeObjectBoxPrimitives<ObjectBoxesExcludeImpl2<ObjectBoxesExtractImpl<Box>,object|null>>;
