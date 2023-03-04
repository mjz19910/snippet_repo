type G_RawUrlInfo=
	|{
		type: "raw";
		type_parts: ["raw","video"];
		raw_id: D_VideoIdStr;
	}
	|{
		type: "raw";
		type_parts: ["raw","browse_id"];
		raw_id: D_BrowseIdStr;
	}
	|{
		type: "raw";
		type_parts: ["raw","channel_id"];
		raw_id: D_ChannelIdStr;
	}
	|{
		type: "raw";
		type_parts: ["raw","video","short"];
		raw_id: D_VideoIdStr;
	}
	|{
		type: "raw";
		type_parts: ["raw","video_referral"];
		raw_id: D_VideoIdStr;
	}
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
	;
;
