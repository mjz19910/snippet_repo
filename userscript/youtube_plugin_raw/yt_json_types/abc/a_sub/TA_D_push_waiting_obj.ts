import {DT_DatabaseStoreTypes} from "../../d/mod_D/_T/DT_DatabaseStoreTypes.ts";

export type TA_D_push_waiting_obj<U extends keyof DT_DatabaseStoreTypes>=[key: U,value: DT_DatabaseStoreTypes[U],version: number];
