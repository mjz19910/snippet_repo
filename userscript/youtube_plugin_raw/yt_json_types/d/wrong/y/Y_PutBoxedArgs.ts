type G_DI_A_List=
	|DI_A_ChannelId_UC
	|DI_A_GuideEntry_LL
	|DI_A_GuideEntry_PL
	|DI_A_GuideEntry_UC
	|DI_A_GuideEntry_WL
	|DI_A_HashtagId
	|DI_A_Playlist_PL
	|DI_A_Playlist_RD
	|DI_A_Playlist_RD_CM_UC
	|DI_A_Playlist_RD_GM_EM
	|DI_A_Playlist_RD_MM
	|DI_A_Playlist_UU
	|DI_A_StartRadio
	|DI_A_UserId
	|DI_A_VideoId
	;
;
type Y_PutBoxedArgs=
	|{a: "bigint"; i: []; t: [string]; v: make_item_group<bigint>;}
	|{a: "boolean"; i: []; t: [string]; v: make_item_group<boolean>;}
	|{a: "browse_id"; i: ["FE"]; t: []; v: DI_BrowseId_FE;}
	|{a: "browse_id"; i: ["MP"]; t: []; v: DI_BrowseId_MP;}
	|{a: "browse_id"; i: ["SP"]; t: []; v: DI_BrowseId_SP;}
	|{a: "browse_id"; i: ["VL","LL"]; t: []; v: DI_BrowseId_VL_LL;}
	|{a: "browse_id"; i: ["VL","PL"]; t: []; v: DI_BrowseId_VL_PL;}
	|{a: "browse_id"; i: ["VL","UC"]; t: []; v: DI_BrowseId_VL_UC;}
	|{a: "browse_id"; i: ["VL","WL"]; t: []; v: DI_BrowseId_VL_WL;}
	|{a: "channel_id"; i: ["UC"]; t: []; v: DI_A_ChannelId_UC;}
	|{a: "hashtag_id"; i: []; t: []; v: DI_A_HashtagId;}
	|{a: "keys"; i: []; t: [string]; v: make_item_group<string|number>;}
	|{a: "load_id"; i: []; t: []; v: T_PrimitiveBox<number>;}
	|{a: "number"; i: []; t: [string]; v: make_item_group<number>;}
	|{a: "play_next"; i: []; t: []; v: DI_A_PlayNext;}
	|{a: "playlist_id"; i: ["LL"]; t: []; v: DI_A_Playlist_LL;}
	|{a: "playlist_id"; i: ["PL"]; t: []; v: DI_A_Playlist_PL;}
	|{a: "playlist_id"; i: ["WL"]; t: []; v: DI_A_Playlist_WL;}
	|{a: "root_visual_element"; i: []; t: [string]; v: make_item_group<number>;}
	|{a: "save_id"; i: []; t: []; v: T_PrimitiveBox<number>;}
	|{a: "string"; i: []; t: [string]; v: make_item_group<string>;}
	|{a: "user_id"; i: []; t: []; v: DI_A_UserId;}
	|{a: "video_id"; i: []; t: []; v: DI_A_VideoId;}
	|{a: "video_time"; i: []; t: []; v: DI_A_VideoTime;}
	|{a: "guide_entry_id"; i: []; t: []; v: GI_A_GuideEntry_Id;}
	|{a: "guide_entry_id"; i: ["UC"]; t: []; v: DI_A_GuideEntry_UC;}
	|{a: "guide_entry_id"; i: ["LL"]; t: []; v: DI_A_GuideEntry_LL;}
	|{a: "guide_entry_id"; i: ["WL"]; t: []; v: DI_A_GuideEntry_WL;}
	|{a: "guide_entry_id"; i: ["PL"]; t: []; v: DI_A_GuideEntry_PL;}
	|{a: "playlist_id"; i: ["RD"]; t: []; v: DI_A_Playlist_RD;}
	|{a: "playlist_id"; i: ["UU"]; t: []; v: DI_A_Playlist_UU;}
	|{a: "playlist_id"; i: ["RD","MM"]; t: []; v: DI_A_Playlist_RD_MM;}
	|{a: "playlist_id"; i: ["RD","CM","UC"]; t: []; v: DI_A_Playlist_RD_CM_UC;}
	|{a: "playlist_id"; i: ["RD","GM","EM"]; t: []; v: DI_A_Playlist_RD_GM_EM;}
	|{a: "start_radio"; i: []; t: []; v: DI_A_StartRadio;}
	|{a: "url_info"; i: []; t: []; v: G_DI_A_List;}
	;
;
