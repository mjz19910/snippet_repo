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
	|TP_ParseUrlSearchParams<D_FormatItem_signatureCipher>["url"]
	;
;
// cspell:disable-next
type D_VideoPlayback_SearchParams=`?expire=${number}&ei=${string}&ip=${string}&id=${string}&itag=${string}&aitags=${string}&source=${string}&requiressl=${string}&mh=${string}&mm=${string}&mn=${string}&ms=${string}&mv=${string}&mvi=${string}&pl=${string}&initcwndbps=${string}&vprv=${string}&mime=${string}&ns=${string}&gir=${string}&clen=${string}&dur=${string}&lmt=${string}&mt=${string}&fvip=${string}&keepalive=${string}&fexp=${string}&c=${string}&txp=${string}&n=${string}&sparams=${string}&lsparams=${string}&lsig=${string}`;
type T_UnixTime_In6Hours<T>=T;
type D_VideoPlaybackShape_S_Params={
	expire: `${T_UnixTime_In6Hours<number>}`;
	// cspell:disable-next
	ei: string;
	ip: "104.243.223.8";
	// cspell:disable-next
	id: "o-AH47gfGtkyAAFUHNdPuZdVym6eFbK5mn_qxUsSW6KSgd";
	// cspell:disable-next
	aitags?: "133,134,135,136,137,160,242,243,244,247,248,278,394,395,396,397,398,399";
	source: "youtube";
	// cspell:disable-next
	requiressl: "yes";
	// cspell:disable-next
	vprv: "1";
	mime: "video/mp4";
	ns: "n6XkoWa7aLwCe7FV58ADqQQL";
	gir?: "yes";
	// cspell:disable-next
	clen?: "16191740";
	dur: "599.800";
	lmt: "1543465568003574";
};
type D_VideoPlaybackShape_LS_Params={
	mh: "B2";
	mm: `${31},${26}`;
	// cspell:disable-next
	mn: "sn-nx57ynsl,sn-n4v7snls";
	ms: "au,onr";
	mv: "m";
	mvi: "3";
	pl: "24";
	// cspell:disable-next
	initcwndbps: "727500";
};
type D_VideoPlaybackShape=D_VideoPlaybackShape_S_Params&D_VideoPlaybackShape_LS_Params&{
	itag: `${137}`;
	mt: `${1675549280}`;
	// cspell:disable-next
	fvip: "4";
	keepalive: "yes";
	fexp: `${24007246}`;
	c: "WEB";
	txp: `${5432432}`;
	n: "WK22LLZ6U2MWGn";
	// cspell:disable-next
	sparams: "expire,ei,ip,id,aitags,source,requiressl,vprv,mime,ns,gir,clen,dur,lmt";
	// cspell:disable-next
	lsparams: "mh,mm,mn,ms,mv,mvi,pl,initcwndbps";
	// cspell:disable-next
	lsig: string;
};
