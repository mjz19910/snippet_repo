type D_GuideEntry_Library={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Library">;
	targetId: "library-guide-item";
	isPrimary: true;
};

type D_GuideEntry=
	|D_GuideEntry_HelpService
	|D_GuideEntry_Library
	|D_GuideEntry_MyVideosTab
	|D_GuideEntry_OfflineDownloadEntry
	|D_GuideEntry_PresentationNewContent
	|D_GuideEntry_PresentationNone
	|D_GuideEntry_ShortsTab
	|D_GuideEntry_Subscriptions
	|D_GuideEntry_VideoLibrary
	|D_GuideEntry_WatchHistory
	|D_GuideEntry_WatchLater
	|D_GuideEntry_WhatToWatch
	|TD_GuideEntry_EntryData<"LIKES_PLAYLIST">
	|TD_GuideEntry_EntryData<"PLAYLISTS">
	|TD_GuideEntry_Simple<"ADD_CIRCLE">
	|TD_GuideEntry_Simple<"CLAPPERBOARD">
	|TD_GuideEntry_Simple<"COURSE">
	|TD_GuideEntry_Simple<"CREATOR_STUDIO_RED_LOGO">
	|TD_GuideEntry_Simple<"FASHION_LOGO">
	|TD_GuideEntry_Simple<"FLAG">
	|TD_GuideEntry_Simple<"GAMING_LOGO">
	|TD_GuideEntry_Simple<"LIVE">
	|TD_GuideEntry_Simple<"MUSIC">
	|TD_GuideEntry_Simple<"NEWS">
	|TD_GuideEntry_Simple<"SETTINGS">
	|TD_GuideEntry_Simple<"TRENDING">
	|TD_GuideEntry_Simple<"TROPHY">
	|TD_GuideEntry_Simple<"UNPLUGGED_LOGO">
	|TD_GuideEntry_Simple<"YOUTUBE_KIDS_ROUND">
	|TD_GuideEntry_Simple<"YOUTUBE_MUSIC">
	|TD_GuideEntry_Simple<"YOUTUBE_ROUND">
	;
;