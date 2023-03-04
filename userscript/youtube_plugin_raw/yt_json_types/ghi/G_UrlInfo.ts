type D_UrlInfo_Video={
	type: "video";
	tag: null;
	type_parts: ["video"];
	id: string;
};
type D_InfoHashtagId={
	type: "hashtag_id";
	hashtag: string;
};
type D_InfoVideoTime={
	type: "video_time";
	raw_value: `${number}s`;
};
type G_UrlInfo=
	|D_BrowseIdUrlInfo
	|D_PlayNextUrlInfo
	|D_VideoReferralUrlInfo
	|D_UrlInfo_Video
	|D_ChannelUrlInfo
	|G_PlaylistUrlInfo
	|D_UserIdInfo
	|D_VideoIdNormal
	|D_InfoVideoIdShorts
	|D_InfoHashtagId
	|D_InfoVideoTime
	;
type G_UrlInfoSrc=
	|{type: "playlist_id",id: GU_PlaylistId;}
	|{type: "browse_id",id: string;}
	;
;