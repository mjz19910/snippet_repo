type DatabaseStoreDescription={[U in keyof DatabaseStoreTypes]: {key: U,value: DatabaseStoreTypes[U];}}[keyof DatabaseStoreTypes];
type DatabaseStoreTypes={
	video_id: {v: string;};
	hashtag: {hashtag: string;};
	boxed_id: {type: string; id: string;};
};
type data_cache_Return={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U][]]}[keyof DatabaseStoreTypes];
type Mk_data_cache_Return<T extends keyof DatabaseStoreTypes>={[U in T]: [U,DatabaseStoreTypes[U][]]}[T];
type Mk_push_waiting_obj_Args<T extends keyof DatabaseStoreTypes>={[U in T]: [U,DatabaseStoreTypes[U]]}[T];
type push_waiting_obj_Args={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U]]}[keyof DatabaseStoreTypes];