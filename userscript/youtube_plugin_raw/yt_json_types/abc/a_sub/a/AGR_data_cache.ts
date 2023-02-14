type AGR_data_cache={
	[U in keyof DT_DatabaseStoreTypes]: [U,DT_DatabaseStoreTypes[U][]];
}[keyof DT_DatabaseStoreTypes];
