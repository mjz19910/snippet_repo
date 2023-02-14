type AG_DatabaseStoreDescription={
	[U in keyof DT_DatabaseStoreTypes]: {key: U; value: DT_DatabaseStoreTypes[U];};
}[keyof DT_DatabaseStoreTypes];
