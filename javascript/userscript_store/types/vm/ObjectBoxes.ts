import {ObjectBox} from "./ObjectBox";
import {IndexedObject as IndexedObject} from "./IndexedObject";
import {IndexedFnBox} from "./IndexedFunctionBox";

export type VMObjectTypes = IndexedFnBox | IndexedObject | ObjectBox;
