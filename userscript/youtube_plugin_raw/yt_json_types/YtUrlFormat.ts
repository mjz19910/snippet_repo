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
	`${YtDomain|""}/api/stats/ads?${ApiStatsAdsArgs}`,
	`https://i.ytimg.com/vi/${string}/maxresdefault.jpg`,
	`https://music.youtube.com${"/"|""}`,
	`https://rr5---sn-nx57ynsd.googlevideo.com/initplayback?${string}`,
	`https://studio.youtube.com${"/"|""}`,
	`https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273`,
	`https://www.youtubekids.com${"/"|""}?source=youtube_web`,
	`https://yt${number}.ggpht.com/${string}=s88-c-k-c0x00ffffff-no-rj`,
	ParsableBaseUrlFormat,
][number];