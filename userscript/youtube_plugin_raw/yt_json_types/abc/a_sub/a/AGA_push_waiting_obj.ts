import {DT_DatabaseStoreTypes} from "../../../d/mod_D/_T/DT_DatabaseStoreTypes.ts";
import {TA_D_push_waiting_obj} from "../TA_D_push_waiting_obj.ts";

export type AGA_push_waiting_obj={
	[U in keyof DT_DatabaseStoreTypes]: TA_D_push_waiting_obj<U>;
}[keyof DT_DatabaseStoreTypes];
export type AGA_push_waiting_obj_noVersion={
	[U in keyof DT_DatabaseStoreTypes]: [key: U, value: DT_DatabaseStoreTypes[U]];
}[keyof DT_DatabaseStoreTypes];
