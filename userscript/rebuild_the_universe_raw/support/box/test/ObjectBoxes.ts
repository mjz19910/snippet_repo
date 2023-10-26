import {Box} from "../mod/Box.ts";
import {ObjectBoxesExtractImpl} from "./ObjectBoxesExtractImpl.ts";
import {ObjectBoxesExcludeImpl2} from "./ObjectBoxesExcludeImpl2.ts";
import {ExcludeObjectBoxPrimitives} from "../mod/ExcludeObjectBoxPrimitives.ts";

export type ObjectBoxes=ExcludeObjectBoxPrimitives<ObjectBoxesExcludeImpl2<ObjectBoxesExtractImpl<Box>,Record<string, unknown>|null>>;
