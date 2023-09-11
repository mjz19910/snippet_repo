import {DT_DatabaseStoreTypes} from "./DT_DatabaseStoreTypes.js";

export namespace DT_Database {
	const V_StoreKeys=(["boxed_id"] as const) satisfies readonly (keyof DT_DatabaseStoreTypes)[];
	export type V_StoreKeys_=typeof V_StoreKeys;
}
