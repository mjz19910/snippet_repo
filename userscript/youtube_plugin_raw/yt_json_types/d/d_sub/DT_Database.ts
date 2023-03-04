namespace DT_Database {
	const V_StoreKeys=(["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"] as const) satisfies readonly (keyof DT_DatabaseStoreTypes)[];
	export type V_StoreKeys_=typeof V_StoreKeys;
}
