import {ObjectBox} from "./ObjectBox";
import {IndexedFnBox} from "./box/IndexedFunctionBox";
import {IndexedObject} from "./index_access/IndexedObject";

export type ObjectBoxes = IndexedFnBox | IndexedObject | ObjectBox;
