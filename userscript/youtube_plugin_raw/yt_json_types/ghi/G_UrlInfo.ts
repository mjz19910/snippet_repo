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
	|D_PlaylistInfo_LL
	|D_PlaylistInfo_WL
	|{type: "browse_id",tag: "FE",type_parts: ["browse_id","FE"],raw_id: G_BrowseIdStr_FE;}
	|{type: "browse_id",tag: "SP",type_parts: ["browse_id","SP"],raw_id: G_BrowseIdStr_SP;}
	|{type: "browse_id",tag: "k",type_parts: ["browse_id","k"],raw_id: "raw_id";}
	;
;
