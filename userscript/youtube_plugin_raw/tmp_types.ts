type DatabaseStoreDescription={[U in keyof DatabaseStoreTypes]: {key: U,value: DatabaseStoreTypes[U];}}[keyof DatabaseStoreTypes];
type DatabaseStoreTypes={
	video_id: {
		key: `video_id:${put_video_args_Args["type"]}:${string}`;
		type: put_video_args_Args["type"];
		v: string;
	};
	hashtag: {
		key: `hashtag:${string}`;
		hashtag: string;
	};
	boxed_id: {
		key: `boxed_id:${string}:${string}`;
		type: string;
		id: string;
	};
	channel_id: {
		key: `channel_id:UC:UC${string}`;
		type: "channel_id:UC";
		id: string;
		raw_id: `UC${string}`;
	};
	playlist: {
		key: `playlist:${string}:${string}`;
		type: string;
		id: string;
	}
};
type put_video_args_Args={
	type: "normal";
	v: string;
}|{
	type: "shorts";
	v: string;
};
type data_cache_Return={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U][]]}[keyof DatabaseStoreTypes];
type Mk_data_cache_Return<T extends keyof DatabaseStoreTypes>={[U in T]: [U,DatabaseStoreTypes[U][]]}[T];
type Mk_push_waiting_obj_Args<T extends keyof DatabaseStoreTypes>={[U in T]: [U,DatabaseStoreTypes[U]]}[T];
type push_waiting_obj_Args={[U in keyof DatabaseStoreTypes]: [U,DatabaseStoreTypes[U]]}[keyof DatabaseStoreTypes];
type V_SerializedContext_BinaryObj={
	1: {
		1: 12;
	};
};