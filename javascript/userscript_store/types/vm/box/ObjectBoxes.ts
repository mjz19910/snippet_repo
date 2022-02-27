import {ObjectBox} from "./ObjectBox";
import {IndexedFnBox} from "./IndexedFunctionBox";
import {IndexBox} from "../index_access/IndexedObject";

export type ObjectBoxes = IndexedFnBox | IndexBox | ObjectBox;
