type D_BoxedPlaylist_PL={
	type: "boxed_id";
	tag: "playlist_id:PL";
	key: `boxed_id:playlist_id:PL:${string}`;
};

type D_Boxed_VL_LL={
	type: "boxed_id";
	tag: "browse_id:VL";
	key: "boxed_id:browse_id:VL:LL";
	value: DI_BrowseId_VL;
};
type D_Boxed_VL_PL={
	type: "boxed_id";
	tag: "browse_id:VL";
	key: `boxed_id:browse_id:VL:PL${string}`;
	value: DI_BrowseId_VL;
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
	|D_Boxed_VL_LL
	|D_Boxed_VL_PL
	|{
		type: "boxed_id";
		tag: "browse_id:SP";
		key: `boxed_id:browse_id:SP:${string}`;
		value: DI_BrowseId_SP;
	}
	|{
		type: "boxed_id";
		tag: "playlist_id:LL";
		key: "boxed_id:playlist_id:LL";
		value: DI_Playlist_LL;
	}
	|{
		type: "boxed_id";
		tag: "playlist_id:WL";
		key: "boxed_id:playlist_id:WL";
		value: DI_Playlist_WL;
	}
	|{
		type: "boxed_id";
		tag: "browse_id:VL";
		key: `boxed_id:browse_id:VL:${string}`;
		value: DI_BrowseId_VL;
	}
	|{
		type: "playlist_id";
		tag: "playlist_id:WL";
		key: "boxed_id:playlist_id:WL";
		value: DI_Playlist_WL;
	}
	;
;
