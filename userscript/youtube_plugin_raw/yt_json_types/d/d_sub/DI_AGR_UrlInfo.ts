type DI_AGR_UrlInfo=
	|T_UrlInfoPartial<"raw",["browse_id"],GU_BrowseId>
	|DI_R_ChannelId
	|T_UrlInfoPartial<"raw",["guide_entry_id"],GU_GuideEntryId>
	|T_UrlInfoPartial<"raw",["playlist_id"],GU_PlaylistId>
	|T_UrlInfoPartial<"raw",["video_id"],DU_VideoId>
	|{type: "raw",tag: "key:start_radio",info_arr: [{start_radio: `${0|1}`;}];}
	|T_UrlInfoPartial<"raw",["playlist_id","RD"],Extract<GU_PlaylistId,`RD${string}`>>
	;
;
type DI_G_UrlInfo=DI_AGR_UrlInfo["tag"] extends infer Y extends string? Y extends infer I? I extends `key:${infer J}`? {
	type: "key";
	tag: J;
}:{
	type: I;
}:never:never;
type MakeRet_DI_AGR_UrlInfo<T extends DI_AGR_UrlInfo>=T extends infer I extends DI_AGR_UrlInfo? Extract<DI_G_UrlInfo,{type: I["tag"];}>:never;
type T1=MakeRet_DI_AGR_UrlInfo<DI_R_ChannelId>;
type MK_DI_R_ChannelId=MakeRet_DI_AGR_UrlInfo<DI_R_ChannelId>;
