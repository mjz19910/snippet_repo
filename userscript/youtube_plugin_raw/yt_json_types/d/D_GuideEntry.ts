type D_GuideEntry=
	|never
	|{
		icon: T_Icon<"FEEDBACK">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Send feedback">;
		serviceEndpoint: T_SE_Signal<M_SendPost,G_ClientSignal>;
	}
	|{
		icon: T_Icon<"EXPAND">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Show more">;
	}
	|D_GuideEntry_HelpService
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