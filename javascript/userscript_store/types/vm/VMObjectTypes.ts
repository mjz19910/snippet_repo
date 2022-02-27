import {ObjectBox} from "./ObjectBox";
import {VMIndexedValue} from "./VMIndexedValue";
import {VMIndexedCallableBox} from "./VMIndexedCallableBox";

export type VMObjectTypes = VMIndexedCallableBox | VMIndexedValue | ObjectBox;
