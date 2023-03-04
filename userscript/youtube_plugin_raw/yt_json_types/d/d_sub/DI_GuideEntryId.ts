type TagGuideId_PL={
	tag: "PL";
	value: DI_Playlist_PL;
};
type TagGuideId_WL={
	tag: "WL";
	value: DI_Playlist_WL;
};
type TagGuideId_LL={
	tag: "LL";
	value: DI_Playlist_LL;
};
type DI_GuideEntryId={
	type: "guide_entry_id";
	info_arr: [TagGuideId_PL|TagGuideId_WL|TagGuideId_LL];
};
