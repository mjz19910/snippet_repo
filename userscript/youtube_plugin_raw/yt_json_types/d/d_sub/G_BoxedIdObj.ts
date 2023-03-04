type G_BoxedIdObj=
	|D_BoxedBigintStore
	|D_BoxedBooleanStore
	|D_BoxedHashtagId
	|D_BoxedKeysStore
	|D_BoxedLoadId
	|D_BoxedNumberStore
	|D_BoxedSaveId
	|D_BoxedStringStore
	|D_BoxedUpdateId
	|D_BoxedVEStore
	|D_BoxedVideoId
	|D_BoxedVideoTime
	|{
		type: "boxed_id";
		tag: "user_id";
		key: `boxed_id:user_id:${string}`;
		value: DI_UserId;
	}
	;
;