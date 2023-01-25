type TD_GuideEntry_Simple<T extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
};
type D_GuideEntry=[
	TD_GuideEntry_Simple<"YOUTUBE_ROUND">,
	TD_GuideEntry_Simple<"FASHION_LOGO">,
	TD_GuideEntry_Simple<"COURSE">,
	TD_GuideEntry_Simple<"TROPHY">,
	TD_GuideEntry_Simple<"NEWS">,
	TD_GuideEntry_Simple<"GAMING_LOGO">,
	{
		navigationEndpoint: E_Browse;
		icon: T_Icon<"LIVE">;
		trackingParams: string;
		formattedTitle: R_SimpleText;
		accessibility: D_Accessibility;
	},
	{
		navigationEndpoint: E_Browse;
		icon: T_Icon<"CLAPPERBOARD">;
		trackingParams: string;
		formattedTitle: R_SimpleText;
		accessibility: D_Accessibility;
	},
	{
		navigationEndpoint: E_Browse;
		icon: T_Icon<"MUSIC">;
		trackingParams: string;
		formattedTitle: R_SimpleText;
		accessibility: D_Accessibility;
	},
	{
		navigationEndpoint: E_Browse;
		icon: T_Icon<"TRENDING">;
		trackingParams: string;
		formattedTitle: R_SimpleText;
		accessibility: D_Accessibility;
	},
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
	D_GuideEntry_LikesPlaylist,
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