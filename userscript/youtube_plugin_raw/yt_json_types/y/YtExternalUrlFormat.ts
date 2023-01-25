// spell:ignore trackclk aclk
type YtExternalUrlFormat=[
	`https://ad.doubleclick.net/ddm/trackclk/${string}`,
	`https://i.ytimg.com/vi/${string}/maxresdefault.jpg`,
	`https://music.youtube.com${"/"|""}`,
	`${"https:"}//${GoogleVideoSubDomain}.googlevideo.com/initplayback?${string}`,
	`https://studio.youtube.com${"/"|""}`,
	`https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273`,
	`https://www.google.com/get/videoqualityreport/`,
	`https://www.googleadservices.com/pagead/aclk?${string}`,
	// ApiStatsAdsArgs
	`https://www.youtube.com/api/stats/ads?${string}`,
	`https://www.youtubekids.com${"/"|""}?source=youtube_web`,
	`https://yt${number}.ggpht.com/${string}=s88-c-k-c0x00ffffff-no-rj`,
	`https://www.gstatic.com/youtube/img/watch/yt_music_channel.jpeg`
][number];