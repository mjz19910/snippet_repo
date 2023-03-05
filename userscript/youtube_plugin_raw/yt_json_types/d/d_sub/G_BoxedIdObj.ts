type D_Boxed_GuideEntryId_LL={
	type: "boxed_id";
	tag: "guide_entry_id";
	key: "boxed_id:guide_entry_id:LL";
	value: {
		type: "guide_entry_id";
		info_arr: [TagGuideId_LL];
	};
};
type D_Boxed_GuideEntryId_WL={
	type: "boxed_id";
	tag: "guide_entry_id";
	key: "boxed_id:guide_entry_id:WL";
	value: {
		type: "guide_entry_id";
		info_arr: [TagGuideId_WL];
	};
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
	|D_Boxed_Playlist_PL
	|D_BoxedPlayNext
	|D_BoxedSaveId
	|D_BoxedStringStore
	|D_BoxedUpdateId
	|D_BoxedUserId
	|D_BoxedVEStore
	|D_BoxedVideoId
	|D_BoxedVideoTime
	|D_Boxed_BrowseId_VL_LL
	|D_Boxed_BrowseId_VL_PL
	|D_Boxed_BrowseId_SP
	|D_Boxed_Playlist_LL
	|D_Boxed_Playlist_WL
	|D_Boxed_VL
	|D_Boxed_Playlist_WL
	|D_Boxed_GuideEntryId_LL
	|D_Boxed_GuideEntryId_WL
	;
;
