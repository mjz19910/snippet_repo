type AGA_push_waiting_obj={
	[U in keyof DT_DatabaseStoreTypes]: TA_D_push_waiting_obj<U>;
}[keyof DT_DatabaseStoreTypes];
