type D_UrlFormat=
	|"/"
	|"/channel_switcher"
	|"/upload"
	|"android-app://com.google.android.youtube/http/youtube.com/premium"
	|`/@${string}`
	|`/@${string}${""|`/${ChannelSubUrlFormat}`}`
	|`/${D_ApiPathFormat_1}`
	|`/account${""|`_${G_AccountPageSettingsSections}`}`
	|`/api/stats/ads?${string}`
	|`/channel/UC${string}`
	|`/channel/UC${string}`
	|`/feed/${D_BrowseEndpointPages}`
	|`/feed/trending?${string}`
	|`/gaming`
	|`/playlist?${string}`
	|`/premium`
	|`/reporthistory`
	|`/results?${string}`
	|`/shorts/${string}`
	|`/watch?${string}`
	|`http://www.youtube.com/watch?${string}`
	|`https://support.google.com/youtube/answer/${number}`
	|`https://www.youtube.com/watch?${string}`
	|D_Youtube_Streaming_ProbeUrl
	|D_ExternalUrlFormat
	|D_VE6827_PageUrl
	|YTExternalUrl
	|NonNullable<D_AdaptiveFormatItem["url"]>
	|NonNullable<D_FormatItem["url"]>
	;
;