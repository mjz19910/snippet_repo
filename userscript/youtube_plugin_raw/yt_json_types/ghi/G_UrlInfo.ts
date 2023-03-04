type D_VideoUrlInfo={
	type: "video";
	type_parts: ["video"];
	id: string;
};
type D_HashtagIdInfo={
	type: "hashtag_id";
	hashtag: string;
};
type G_UrlInfo=
	|D_BrowseIdUrlInfo
	|D_PlayNextUrlInfo
	|D_VideoReferralUrlInfo
	|D_VideoUrlInfo
	|D_ChannelUrlInfo
	|G_PlaylistUrlInfo
	|D_UserIdInfo
	|D_VideoIdNormal
	|D_VideoIdShorts
	|D_HashtagIdInfo
	|{
		type: "raw";
		type_parts: ["raw","playlist_id"];
		raw_id: GU_PlaylistId;
	}
	|{
		type: "raw";
		type_parts: ["raw","playlist_id","RD"];
		raw_id: D_InfinitePlaylistIdStr;
	}
	|{
		type: "raw";
		type_parts: ["raw","browse_id","VL"];
		raw_id: GU_VE5754_BrowseId;
	}
	|{
		type: "raw";
		type_parts: ["raw","video","normal"];
		raw_id: D_VideoIdStr;
	}
	|{
		type: "raw";
		type_parts: ["raw","channel_id","UC"];
		raw_id: D_ChannelIdStr;
	}
	|{
		type: "video_time";
		raw_value: `${number}s`;
	}
	;
type G_UrlInfoSrc=
	|{type: "playlist_id",id: GU_PlaylistId;}
	|{type: "browse_id",id: string;}
	;