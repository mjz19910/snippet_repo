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
	;
;
