type DI_AGR_UrlInfo=
	|T_UrlInfoPartial<"raw",["browse_id"],DU_Browse_Id>
	|DI_R_ChannelId
	|T_UrlInfoPartial<"raw",["guide_entry_id"],DU_GuideEntry_Id>
	|T_UrlInfoPartial<"raw",["playlist_id"],DU_Playlist_Id>
	|T_UrlInfoPartial<"raw",["video_id"],DU_VideoId>
	|{type: "raw",tag: "key:start_radio",info_arr: [{start_radio: `${0|1}`;}];}
	|T_UrlInfoPartial<"raw",["playlist_id","RD"],Extract<DU_Playlist_Id,`RD${string}`>>
	|{type: "raw",tag: "playlist_id:PL"; info_arr: [DIT_Item<"raw_id",DIT_Prim<T_IdTemplate<"PL">>>];}
	|{type: "raw",tag: "playlist_id:UU"; info_arr: [DIT_Item<"raw_id",DIT_Prim<`UU${string}`>>];};
;
;
type DI_SpecialInfo=Exclude<DI_AGR_UrlInfo["info_arr"][0],DIT_Item<"raw_id",DIT_Prim<any>>>;
type DI_G_UrlInfo=
	DI_AGR_UrlInfo["tag"] extends infer Y extends string?
	Y extends infer I?
	I extends "channel_id"? DI_A_ChannelId_UC:
	I extends "browse_id"? GI_BrowseId:
	I extends "guide_entry_id"? GI_GuideEntry_Id:
	I extends "playlist_id"? DI_G_PlaylistId:
	I extends "playlist_id:RD"? DI_A_Playlist_RD:
	I extends "playlist_id:PL"? DI_A_Playlist_PL:
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
type MakeRet_DI_AGR_UrlInfo<T extends DI_AGR_UrlInfo>=
	T extends infer I extends DI_AGR_UrlInfo?
	I["tag"] extends "key:start_radio"?
	DI_Key_StartRadio:
	Extract<DI_G_UrlInfo,{type: I["tag"];}>:
	never
	;
;
type DI_Key_StartRadio={
	type: "key";
	tag: "start_radio";
	info_arr: [{start_radio: `${0|1}`;}];
};
type T1=MakeRet_DI_AGR_UrlInfo<DI_R_ChannelId>;
type MK_DI_R_ChannelId=MakeRet_DI_AGR_UrlInfo<DI_R_ChannelId>;
