type G_RawUrlInfo_1={
	type: "raw";
	type_parts: ["raw","video"];
	raw_id: D_VideoIdStr;
};
type G_RawUrlInfo_2={
	type: "raw";
	type_parts: ["raw","browse_id"];
	raw_id: D_BrowseIdStr;
};
type G_RawUrlInfo_3={
	type: "raw";
	type_parts: ["raw","channel_id"];
	raw_id: D_ChannelIdStr;
};
type G_RawUrlInfo_4={
	type: "raw";
	type_parts: ["raw","video","short"];
	raw_id: D_VideoIdStr;
};
type G_RawUrlInfo_5={
	type: "raw";
	type_parts: ["raw","video","normal"];
	raw_id: D_VideoIdStr;
};
type G_RawUrlInfo_6={
	type: "raw";
	type_parts: ["raw","video_referral"];
	raw_id: D_VideoIdStr;
};
type G_RawPlaylistUrlInfo=
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
		type_parts: ["raw","playlist_id","PL"];
		raw_id: G_PlaylistUrlInfo_PL["raw_id"];
	}
	|{
		type: "raw";
		type_parts: ["raw","playlist_id",G_PlaylistUrlInfo_UU["raw_id"]];
		raw_id: G_PlaylistUrlInfo_UU["raw_id"];
	}
	;
;
type G_RawUrlInfo=
	|G_RawUrlInfo_1
	|G_RawUrlInfo_2
	|G_RawUrlInfo_3
	|G_RawUrlInfo_4
	|G_RawUrlInfo_5
	|G_RawUrlInfo_6
	|G_RawPlaylistUrlInfo
	;
;
