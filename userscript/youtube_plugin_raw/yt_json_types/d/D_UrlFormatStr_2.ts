type D_UrlFormatStr_2=[
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/account${""|`_${G_AccountPageSettingsSections}`}`,
	`/channel/UC${string}`,
	`/feed/${D_BrowseEndpointPages}`,
	`/feed/trending?bp=${string}`,
	`/playlist?${D_PlaylistUrlParams}`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${D_WatchUrlStr}`,
][number];