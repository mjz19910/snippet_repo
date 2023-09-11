import {DT_DatabaseStoreTypes} from "./DT_DatabaseStoreTypes.js";

export type DT_DatabaseValue=Extract<DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes],{value: any;}>;
