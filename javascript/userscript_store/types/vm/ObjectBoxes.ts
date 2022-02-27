import {ObjectBox} from "./ObjectBox";
import {IndexedObject as IndexedObject} from "./IndexedObject";
import {IndexedFnBox} from "./box/IndexedFunctionBox";

export type ObjectBoxes = IndexedFnBox | IndexedObject | ObjectBox;
