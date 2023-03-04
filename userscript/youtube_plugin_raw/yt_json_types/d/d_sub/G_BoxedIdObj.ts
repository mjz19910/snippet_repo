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
	|{
		type: "boxed_id";
		tag: "play_next";
		key: `boxed_id:play_next:${1}`;
		value: DI_PlayNext;
	}
	|{
		type: "boxed_id";
		tag: "playlist_id";
		key: `boxed_id:playlist_id:${DI_G_Playlist["info_arr"][0]["raw_id"]}`;
		value: DI_G_Playlist;
	}
	|{
		type: "boxed_id";
		tag: "browse_id";
		key: `boxed_id:browse_id:${DI_G_BrowseId["tag"]}`;
		value: DI_G_BrowseId;
	}
	|{
		type: "boxed_id";
		tag: "browse_id:FE";
		key: `boxed_id:browse_id:FE:${D_BrowseEndpointPages}`;
		value: DI_BrowseId_FE;
	}
	|{
		type: "boxed_id";
		tag: "channel_id";
		key: `boxed_id:channel_id:UC:${string}`;
		value: DI_ChannelUrl;
	}
	|{
		key: `boxed_id:browse_id:SP:${string}`;
	}
	;
;