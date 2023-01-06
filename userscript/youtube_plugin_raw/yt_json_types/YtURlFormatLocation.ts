type YtURlFormatLocation=[
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/account${""|`_${AccountPageSettingsSections}`}`,
	`/channel/UC${string}`,
	`/feed/${YtFeedSubSections}`,
	`/feed/trending?bp=${string}`,
	`/playlist?${YtPlaylistUrlParamsFormat}`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${YtWatchUrlParamsFormat}`,
][number];