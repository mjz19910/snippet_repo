type DI_AGR_UrlInfo=
	|T_UrlInfoPartial<"raw",["browse_id"],DU_BrowseId>
	|T_UrlInfoPartial<"raw",["channel_id"],DU_ChannelId>
	|T_UrlInfoPartial<"raw",["guide_entry_id"],D_GuideEntryData["guideEntryId"]>
	|T_UrlInfoPartial<"raw",["playlist_id","RD"],Extract<GU_PlaylistId,`RD${string}`>>
	|DI_R_PlaylistId
	|DIR_VideoId
	|{type: "raw_key",key: "start_radio",info_arr: [{start_radio: `${0|1}`;}];}
	;
;
