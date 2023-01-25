type D_GuideEntry_LikesPlaylist=TD_GuideEntry_WithEntryData<"LIKES_PLAYLIST">;

type TD_GuideEntry_WithEntryData<T extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
}