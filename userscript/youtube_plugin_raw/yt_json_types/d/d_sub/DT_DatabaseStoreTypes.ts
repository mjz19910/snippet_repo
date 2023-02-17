namespace DT_Database {
	const V_StoreKeys=(["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"] as const) satisfies readonly (keyof DT_DatabaseStoreTypes)[];
	export type V_StoreKeys_=typeof V_StoreKeys;
}
type DT_DatabaseStoreKeys=DT_Database.V_StoreKeys_;
type DT_DatabaseStoreTypes={
	video_id: {
		key: `video_id:${AG_put_video_args_Args["type"]}:${string}`;
		type: AG_put_video_args_Args["type"];
		v: string;
	};
	hashtag_id: {
		key: `hashtag_id:${string}`;
		hashtag: string;
	};
	boxed_id: {
		key: `boxed_id:${string}:${string}`;
		type: string;
		id: ["one",number[]]|["many",number[][]];
	};
	channel_id: {
		key: `channel_id:UC:${string}`;
		type: "channel_id:UC";
		id: string;
		raw_id: `UC${string}`;
	};
	playlist_id: PlaylistIdDatabaseObj;
	browse_id: {
		key: `browse_id:VL:${string}`;
		type: "browse_id:VL";
		id: `PL${string}`;
		raw_id: `VLPL${string}`;
	};
};
type PlaylistIdDatabaseObj={
	key: `playlist_id:RDCM:UC${string}`;
	type: "playlist_id:RDCM";
	id: `UC${string}`;
	raw_id: `RDCMUC${string}`;
}|{
	key: `playlist_id:self:${D_PlaylistSelfId}`;
	type: string;
	id: D_PlaylistSelfId;
}|{
	key: `playlist_id:${D_PlaylistIdTypeBase}:${string}`;
	type: string;
	id: string;
	raw_id: `${D_PlaylistIdTypeBase}${string}`;
};
