const DT_DatabaseStoreKeys=(["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"] as const) satisfies readonly (keyof DT_DatabaseStoreTypes)[];
type DT_DatabaseStoreKeys=typeof DT_DatabaseStoreKeys;
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
		id: string;
	};
	channel_id: {
		key: `channel_id:UC:UC${string}`;
		type: "channel_id:UC";
		id: string;
		raw_id: `UC${string}`;
	};
	playlist_id: {
		key: `playlist_id:${string}:${string}`;
		type: string;
		id: string;
	};
	browse_id: {
		key: `browse_id:VL:${string}`;
		type: "browse_id:VL";
		id: `PL${string}`;
		raw_id: `VLPL${string}`;
	};
};
