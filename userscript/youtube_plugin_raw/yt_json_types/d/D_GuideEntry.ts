type D_GuideEntry=[
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