type YtUrlFormat=[
	"/",
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/${ApiUrlFormat}`,
	`/account${""|`_${AccountPageSettingsSections}`}`,
	`/channel/UC${string}`,
	`/feed/${YtFeedSubSections}`,
	`/feed/trending?bp=${string}`,
	`/gaming`,
	`/playlist?${YtPlaylistUrlParamsFormat}`,
	`/premium`,
	`/reporthistory`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${YtWatchUrlParamsFormat}`,
	`/watch?v=${string}&list=RD${string}&start_radio=1&rv=${string}`,
	`${YtDomain|""}/api/stats/ads?${ApiStatsAdsArgs}`,
	YtExternalUrlFormat,
	ParsableBaseUrlFormat,
][number];