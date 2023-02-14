type DatabaseStoreDescription={[U in keyof DatabaseStoreTypes]: {key: U,value: DatabaseStoreTypes[U];}}[keyof DatabaseStoreTypes];
type DatabaseStoreTypes={
	video_id: {key: `video_id:${string}`; v: string;};
	hashtag: {key: `hashtag:${string}`; hashtag: string;};
	boxed_id: {key: `boxed_id:${string}:${string}`; type: string; id: string;};
};
type data_cache_Return={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U][]]}[keyof DatabaseStoreTypes];
type Mk_data_cache_Return<T extends keyof DatabaseStoreTypes>={[U in T]: [U,DatabaseStoreTypes[U][]]}[T];
type Mk_push_waiting_obj_Args<T extends keyof DatabaseStoreTypes>={[U in T]: [U,DatabaseStoreTypes[U]]}[T];
type push_waiting_obj_Args={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U]]}[keyof DatabaseStoreTypes];