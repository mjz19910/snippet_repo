type TD_GuideEntry_Simple<T extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
};
type D_GuideEntry=[
	TD_GuideEntry_WithEntryData<"PLAYLISTS">,
	TD_GuideEntry_WithEntryData<"LIKES_PLAYLIST">,
	TD_GuideEntry_Simple<"CREATOR_STUDIO_RED_LOGO">,
	TD_GuideEntry_Simple<"YOUTUBE_MUSIC">,
	TD_GuideEntry_Simple<"YOUTUBE_ROUND">,
	TD_GuideEntry_Simple<"YOUTUBE_KIDS_ROUND">,
	TD_GuideEntry_Simple<"UNPLUGGED_LOGO">,
	TD_GuideEntry_Simple<"SETTINGS">,
	TD_GuideEntry_Simple<"FLAG">,
	TD_GuideEntry_Simple<"FASHION_LOGO">,
	TD_GuideEntry_Simple<"COURSE">,
	TD_GuideEntry_Simple<"TROPHY">,
	TD_GuideEntry_Simple<"NEWS">,
	TD_GuideEntry_Simple<"GAMING_LOGO">,
	TD_GuideEntry_Simple<"LIVE">,
	TD_GuideEntry_Simple<"CLAPPERBOARD">,
	TD_GuideEntry_Simple<"MUSIC">,
	TD_GuideEntry_Simple<"TRENDING">,
	{
		navigationEndpoint: E_Browse;
		thumbnail: D_Thumbnail;
		badges: D_GuideEntryBadges;
		trackingParams: string;
		formattedTitle: R_SimpleText;
		accessibility: D_Accessibility;
		entryData: R_GuideEntryData;
		presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT";
	},
	D_GuideEntry_HelpService,
	D_GuideEntry_MyVideosTab,
	D_GuideEntry_OfflineDownloadEntry,
	D_GuideEntry_ShortsTab,
	D_GuideEntry_Subscriptions,
	D_GuideEntry_VideoLibrary,
	D_GuideEntry_WatchHistory,
	D_GuideEntry_WatchLater,
	D_GuideEntry_WhatToWatch,
][number];
type TTU=D_GuideEntry_MyVideosTab;
type GuideEntryPrimary=Exclude<
	D_GuideEntry,
	D_GuideEntry_VideoLibrary|D_GuideEntry_OfflineDownloadEntry
	|D_GuideEntry_Subscriptions|D_GuideEntry_WhatToWatch
	|D_GuideEntry_HelpService|D_GuideEntry_LikesPlaylist
	|D_GuideEntry_WatchHistory|D_GuideEntry_WatchLater
>;