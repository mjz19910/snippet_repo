type DI_AGR_UrlInfo=
	|T_UrlInfoPartial<"raw",["browse_id"],GU_BrowseId>
	|DI_R_ChannelId
	|T_UrlInfoPartial<"raw",["guide_entry_id"],GU_GuideEntryId>
	|T_UrlInfoPartial<"raw",["playlist_id"],SD_PlaylistId>
	|T_UrlInfoPartial<"raw",["video_id"],DU_VideoId>
	|{type: "raw",tag: "key:start_radio",info_arr: [{start_radio: `${0|1}`;}];}
	|T_UrlInfoPartial<"raw",["playlist_id","RD"],Extract<SD_PlaylistId,`RD${string}`>>
	|{type: "raw",tag: "playlist_id:PL"; info_arr: [{raw_id: T_IdTemplate<"PL">;}];}
	|{type: "raw",tag: "playlist_id:UU"; info_arr: [{raw_id: `UU${string}`;}];}
	;
;
type DI_SpecialInfo=Exclude<DI_AGR_UrlInfo["info_arr"][0],{raw_id: any;}>;
type DI_G_UrlInfo=
	DI_AGR_UrlInfo["tag"] extends infer Y extends string?
	Y extends infer I?
	I extends "channel_id"? DI_A_ChannelId_UC:
	I extends "browse_id"? GI_BrowseId:
	I extends "guide_entry_id"? GI_GuideEntry_Id:
	I extends "playlist_id"? DI_G_PlaylistId:
	I extends "video_id"? DI_VideoId:
	I extends `key:${infer J}`? {
		type: "key";
		tag: J;
	}:{
		type: I;
		_bad: true,
	}:never:never;
type GI_BrowseId=
	|DI_BrowseId_FE
	|DI_BrowseId_MP
	|DI_BrowseId_SP
	|DI_BrowseId_VL_LL
	|DI_BrowseId_VL_PL
	|DI_BrowseId_VL_UC
	|DI_BrowseId_VL_WL
	;
;
type MakeRet_DI_AGR_UrlInfo<T extends DI_AGR_UrlInfo>=T extends infer I extends DI_AGR_UrlInfo? I["tag"] extends "key:start_radio"? DI_Key_StartRadio:Extract<DI_G_UrlInfo,{type: I["tag"];}>:never;
type DI_Key_StartRadio={
	type: "key";
	tag: "start_radio";
	info_arr: [{start_radio: `${0|1}`;}];
};
type T1=MakeRet_DI_AGR_UrlInfo<DI_R_ChannelId>;
type MK_DI_R_ChannelId=MakeRet_DI_AGR_UrlInfo<DI_R_ChannelId>;
