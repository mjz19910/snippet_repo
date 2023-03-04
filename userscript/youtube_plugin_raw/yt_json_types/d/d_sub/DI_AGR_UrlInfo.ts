type DI_AGR_UrlInfo=
	|T_UrlInfoPartial<"raw",["browse_id"],GU_BrowseId>
	|T_UrlInfoPartial<"raw",["channel_id"],DU_ChannelId>
	|T_UrlInfoPartial<"raw",["guide_entry_id"],GU_GuideEntryId>
	|T_UrlInfoPartial<"raw",["playlist_id"],GU_PlaylistId>
	|T_UrlInfoPartial<"raw",["video_id"],DU_VideoId>
	|{type: "raw",tag: "key:start_radio",info_arr: [{start_radio: `${0|1}`;}];}
	;
;
