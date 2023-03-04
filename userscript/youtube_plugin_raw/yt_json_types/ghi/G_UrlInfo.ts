type D_VideoUrlInfo={
	type: "video";
	type_parts: ["video"];
	id: string;
};
type D_HashtagIdInfo={
	type: "hashtag_id";
	hashtag: string;
};

type D_RawPlaylistInfo={
	type: "raw";
	type_parts: ["raw","playlist_id"];
	raw_id: GU_PlaylistId;
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
	|D_RawPlaylistInfo
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
		type: "video_time";
		raw_value: `${number}s`;
	};
type G_UrlInfoSrc={type: "playlist:RDMM"; id: string;};