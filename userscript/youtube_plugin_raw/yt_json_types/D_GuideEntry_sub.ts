type D_GuideEntryData={
	guideEntryId: "WL"|"LL"|`UC${string}`|`PL${string}`;
};
type D_GuideEntry_MyVideosTab={
	navigationEndpoint: E_Url;
	icon: T_Icon<"MY_VIDEOS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
type D_GuideEntry_OfflineDownloadEntry=TD_GuideEntry_Tid_Primary<"OFFLINE_DOWNLOAD","downloads-guide-item">;
type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: T_SE_Signal<M_Empty_WCM,{}>|E_ReelWatch;
	isPrimary: true;
};
type D_GuideEntry_Subscriptions=TD_GuideEntry_Primary<"SUBSCRIPTIONS">;
type D_GuideEntry_VideoLibrary=TD_GuideEntry_Tid_Primary<"VIDEO_LIBRARY_WHITE","library-guide-item">;
type D_GuideEntry_WatchHistory=TD_GuideEntry_NotPrimary<"WATCH_HISTORY">;
type D_GuideEntry_WatchLater=TD_GuideEntry_NotPrimary<"WATCH_LATER">;
type D_GuideEntry_WhatToWatch=TD_GuideEntry_Primary<"WHAT_TO_WATCH">;