type TA_push_waiting_obj<T extends keyof DT_DatabaseStoreTypes>={
	[U in T]: TA_D_push_waiting_obj<U>;
}[T];
