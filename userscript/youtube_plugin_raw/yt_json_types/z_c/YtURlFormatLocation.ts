type YtURlFormatLocation=[
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/account${""|`_${G_AccountPageSettingsSections}`}`,
	`/channel/UC${string}`,
	`/feed/${D$BrowseEndpointPages}`,
	`/feed/trending?bp=${string}`,
	`/playlist?${YtPlaylistUrlParamsFormat}`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${YtWatchUrlParamsFormat}`,
][number];