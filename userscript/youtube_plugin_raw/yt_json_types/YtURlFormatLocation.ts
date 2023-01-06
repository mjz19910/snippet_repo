type YtURlFormatLocation=[
	`/feed/${YtFeedSubSections}`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${YtWatchUrlParamsFormat}`,
	ChannelSwitcherUrlFormat,
	ChannelUrlFormat,
	SettingsEndpointPages,
	YtPlaylistUrlFormat
][number];