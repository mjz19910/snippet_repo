import {DT_DatabaseStoreTypes} from "../../d/mod_D/_T/DT_DatabaseStoreTypes.ts";
import {TA_D_push_waiting_obj} from "./TA_D_push_waiting_obj.ts";

export type TA_push_waiting_obj<T extends keyof DT_DatabaseStoreTypes>={
	[U in T]: TA_D_push_waiting_obj<U>;
}[T];
