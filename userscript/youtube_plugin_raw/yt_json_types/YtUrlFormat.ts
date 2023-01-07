type YtUrlFormat=[
	"/",
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
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
	`/youtubei/v1/browse`,
	`${YtDomain|""}/api/stats/ads?${ApiStatsAdsArgs}`,
][number];