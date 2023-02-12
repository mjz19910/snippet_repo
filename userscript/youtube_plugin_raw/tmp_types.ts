type DatabaseStoreDescription={name: keyof DatabaseStoreTypes;};
type DatabaseStoreTypes={
	video_id: {v: string;};
	hashtag: {hashtag: string;};
	channel_id: {type: string; id: string;};
};
type data_cache_Return={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U][]]}[keyof DatabaseStoreTypes];
type push_waiting_obj_Args={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U]]}[keyof DatabaseStoreTypes];