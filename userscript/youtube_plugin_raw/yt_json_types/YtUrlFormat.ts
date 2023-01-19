type YtUrlFormat=[
	"/",
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/${ApiUrlFormat}`,
	`/account${""|`_${AccountPageSettingsSections}`}`,
	`/api/stats/ads?${string}`,
	`/channel/UC${string}`,
	`/feed/${YtFeedSubSections}`,
	`/feed/trending?${string}`,
	`/gaming`,
	`/playlist?${string}`,
	`/premium`,
	`/reporthistory`,
	`/shorts/${string}`,
	YtExternalUrlFormat,
	VE6827_PageUrl,
	`/@${string}`,
	"/upload",
	`/results?${string}`,
	`/channel/UC${string}`,
	`/watch?${string}`,
	`http://www.youtube.com/watch?${string}`,
	`https://support.google.com/youtube/answer/${number}`,
	YTExternalUrl,
][number];
type YTExternalEncUrl=[
	`[parse_url_external_1] https://m.youtube.com/premium`,
][number];
type YTExternalUrl=SplitOnce<SplitOnce<YTExternalEncUrl,"]">[1]," ">[1];
type WatchUrlFormat=[
	WatchPageUrl,
	`/watch?${YtWatchVideoUrlFormat}`,
	`/watch?v=${string}&list=RD${string}&start_radio=1&rv=${string}`,
	`/watch?v=${string}&list=RDGM${string}&start_radio=1&rv=${string}`,
][number];
type ResultsPageUrl=`/results?search_query=${string}`;
type PlaylistUrlFormat=`/playlist?list=${PlaylistId}`;