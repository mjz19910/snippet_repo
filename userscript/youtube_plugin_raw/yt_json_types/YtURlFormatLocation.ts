type YtURlFormatLocation=[
	`/feed/${YtFeedSubSections}`,
	`/feed/trending?bp=${string}`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${YtWatchUrlParamsFormat}`,
	ChannelSwitcherUrlFormat,
	ChannelUrlFormat,
	SettingsEndpointPages,
	YtPlaylistUrlFormat
][number];