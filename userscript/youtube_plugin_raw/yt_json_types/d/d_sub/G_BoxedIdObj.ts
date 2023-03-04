type D_BoxedPlaylist_PL={
	type: "boxed_id";
	tag: "playlist_id:PL";
	key: `boxed_id:playlist_id:PL:${string}`;
};

type G_BoxedIdObj=
	|D_BoxedBigintStore
	|D_BoxedBooleanStore
	|D_BoxedBrowseId_FE
	|D_BoxedBrowseId_MP
	|D_BoxedBrowseId_SP
	|D_BoxedChannelId_UC
	|D_BoxedHashtagId
	|D_BoxedKeysStore
	|D_BoxedLoadId
	|D_BoxedNumberStore
	|D_BoxedPlaylist_PL
	|D_BoxedPlayNext
	|D_BoxedSaveId
	|D_BoxedStringStore
	|D_BoxedUpdateId
	|D_BoxedUserId
	|D_BoxedVEStore
	|D_BoxedVideoId
	|D_BoxedVideoTime
	|{
		type: "boxed_id";
		tag: "browse_id:VL";
		key: "boxed_id:browse_id:VL:LL";
		value: DI_BrowseId_VL;
	}
	|{
		type: "boxed_id";
		tag: "browse_id:VL";
		key: "boxed_id:browse_id:VL:PL";
		value: DI_BrowseId_VL;
	}
	|{
		type: "boxed_id";
		tag: "browse_id:VL";
		key: `boxed_id:browse_id:VL:PL${string}`;
		value: DI_BrowseId_VL;
	}
	|{
		type: "boxed_id";
		tag: `browse_id:${string}`;
		key: `boxed_id:browse_id:${string}:${string}`;
	}
	|{
		type: "boxed_id";
		tag: "browse_id:SP";
		key: `boxed_id:browse_id:SP:${string}`;
		value: DI_BrowseId_SP;
	}
	;
;
