type YtURlFormatLocation=[
	ChannelUrlFormat,
	`watch?${YtWatchUrlParamsFormat}`,
	`feed/${YtFeedSubSections}`,
	`shorts/${string}`,
	SettingsEndpointPages,
	ChannelSwitcherUrlFormat,
	YtPlaylistUrlFormat
][number];