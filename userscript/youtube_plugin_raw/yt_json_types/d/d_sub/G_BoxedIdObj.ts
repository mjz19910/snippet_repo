type D_BoxedVideoTime={
	type: "boxed_id";
	tag: "video_time";
	key: `boxed_id:video_time:${number}s`;
	value: DI_VideoTime;
};

type D_BoxedVideoId={
	key: `boxed_id:video_id:${string}`;
	tag: "video_id";
	value: DI_VideoId;
};

type G_BoxedIdObj=
	|D_BoxedUpdateId
	|D_BoxedVEStore
	|D_BoxedStringStore
	|D_BoxedNumberStore
	|D_BoxedBooleanStore
	|D_BoxedKeysStore
	|D_BoxedBigintStore
	|D_BoxedUpdateId
	|D_BoxedHashtagId
	|D_BoxedVideoTime
	|D_BoxedVideoId
	;
;