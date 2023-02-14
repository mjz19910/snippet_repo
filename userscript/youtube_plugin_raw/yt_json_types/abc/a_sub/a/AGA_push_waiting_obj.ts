type AGA_push_waiting_obj={
	[U in keyof DT_DatabaseStoreTypes]: TA_D_push_waiting_obj<U>;
}[keyof DT_DatabaseStoreTypes];
type AGA_push_waiting_obj_noVersion={
	[U in keyof DT_DatabaseStoreTypes]: [key: U, value: DT_DatabaseStoreTypes[U]];
}[keyof DT_DatabaseStoreTypes];
