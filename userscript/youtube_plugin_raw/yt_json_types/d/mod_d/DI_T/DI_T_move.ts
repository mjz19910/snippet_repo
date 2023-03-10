//#region DStr
type DStr_DI_ABDZ="/di/a/b/d/z";
type DStr_DI_AZ="/di/a/z";
type DStr_DIT_AEZ="/dit/a/e/z";
//#endregion
//#region T_DI
type T_DI_Raw<k1 extends string,k2 extends string,T>={a: "/item/a/b/c/z"; b: "raw",c: `${k1}:${k2}`,z: [T];};
type T_DI_Key_2<C extends string,T>={a: "/item/a/b/c/z"; b: "key",c: C,z: [T];};
type T_DI_Raw_2<C extends string,T>={a: "/item/a/b/c/z"; b: "raw",c: C,z: [T];};
//#endregion
//#region ABDZ
type DI_T_Item_ABD<T_Type,T_Tag,T_InfoItem>={
	a: DStr_DI_ABDZ; b: T_Type; d: T_Tag;
	z: [T_InfoItem];
};
//#endregion
//#region AEZ
type T_PrimitiveBox<T>={
	a: DStr_DIT_AEZ;
	// ^ a = is
	e: T_GetPrimitiveTag<T>;
	// ^ e = type_name
	// * primitive typeof
	z: [T];
	// ^ z = info_arr
};
type T_PrimitiveBox_E<T,E extends T_GetPrimitiveTag<T>>={
	a: DStr_DIT_AEZ;
	// ^ a = is
	e: E;
	// ^ e = type_name
	// * primitive typeof
	z: [T];
	// ^ z = info_arr
};
type DIT_Box_Typeof2<T_Type extends T_GetPrimitiveTag<U>,U>={
	a: DStr_DIT_AEZ;
	// ^ a = is
	e: T_Type;
	// ^ e = type
	z: [U];
	// ^ z = info_arr
};
//#endregion

//#region {k,v}
type DI_SrcInfo_Any={
	k: "any";
	v: DU_Browse_Id|DU_GuideEntry_Id|DU_Playlist_Id;
};
type DI_SrcInfo=
	|DI_SrcInfo_Any
	|{k: "start_radio"; v: DU_StartRadio;}
	|{k: "video_id"; v: DU_VideoId;}
	|{k: "hashtag_id"; v: string;}
	|{k: "user_id"; v: string;}
	;
;
//#endregion
//#region {K,raw_id}
type DI_SpecialInfo=T_DI_FromObj<{raw_id: string;}>;
type DI_RetInfo={
	a: "tag";
	k: "user_id";
	v: string;
}|{
	a: "tag"; k: "hashtag_id"; v: string;
}|{
	a: "tag"; k: "video_id"; v: string;
}|{
	a: "tag"; k: "any"; c: "FE";
	v: T_IdTemplate<"FE">;
}|{
	a: "tag"; k: "any"; c: "SP";
	v: T_IdTemplate<"SP">;
}|{
	a: "tag"; k: "any"; c: "VL";
	v: T_IdTemplate<"VL">;
}|{
	a: "tag"; k: "any"; c: "UC";
	v: T_IdTemplate<"UC">;
}|{
	a: "tag"; k: "any"; c: "PL";
	v: T_IdTemplate<"PL">;
}|{
	a: "tag"; k: "any"; c: "MP";
	v: T_IdTemplate<"MP">;
}|{
	a: "tag"; k: "any"; c: "UU";
	v: T_IdTemplate<"UU">;
}|{
	a: "tag"; k: "any"; c: "RD";
	v: Extract<DU_Playlist_Id,`RD${string}`>;
}|{
	a: "tag"; k: "any"; c: null;
	v: DU_Playlist_Static;
}|{
	a: "/di/a/k/raw_id";
	k: "hashtag_id";
	v: string;
}|{
	a: "/di/a/k/raw_id";
	k: "video_id";
	v: DU_VideoId;
}|{
	a: "tag"; k: "start_radio";
	v: DU_StartRadio;
}|{a: null;};
//#endregion
//#region ABCZ
type DI_A_ChannelId_UC={
	a: "/item/a/b/c/z";
	b: "channel_id";
	c: "UC";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"UC">;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_GuideEntry_LL={
	a: "/item/a/b/c/z";
	b: "guide_entry_id";
	c: "LL";
	z: [DI_A_Playlist_LL];
};
type DI_GuideEntry_PL={
	a: "/item/a/b/c/z";
	b: "guide_entry_id";
	c: "PL";
	z: [DI_A_Playlist_PL];
};
type DI_GuideEntry_VL_LL={
	a: "/item/a/b/c/z";
	b: "guide_entry_id";
	c: "VL:LL";
	z: [DI_BrowseId_VL_LL];
};
//#endregion
//#region DI_G
type DI_G_PlaylistId=
	|DI_A_Playlist_LL
	|DI_A_Playlist_PL
	|DI_A_Playlist_RD
	|DI_A_Playlist_RD_CM_UC
	|DI_A_Playlist_RD_GM_EM
	|DI_A_Playlist_RD_MM
	|DI_A_Playlist_UU
	|DI_A_Playlist_WL
	;
;
type DI_G_Playlist_RD=
	|DI_A_Playlist_RD
	|DI_A_Playlist_RD_CM_UC
	|DI_A_Playlist_RD_GM_EM
	|DI_A_Playlist_RD_MM
	;
;
//#endregion
//#region BrowseId
//#region DI_G
type DI_G_BrowseId=
	|DI_BrowseId_FE
	|DI_BrowseId_MP
	|DI_BrowseId_SP
	|DI_BrowseId_VL_LL
	|DI_BrowseId_VL_PL
	|DI_BrowseId_VL_UU
	|DI_BrowseId_VL_WL
	;
;
//#endregion
//#endregion

//#region ABZ
type DI_A_PlayNext={
	a: "/item/a/b/z";
	b: "play_next";
	z: [
		T_DI_FromObj<{raw_id: `${1}`;}>,
		T_DI_FromObj<{parsed_value: 1;}>
	];
};
//#endregion
//#region DI_AGR
type DI_AGR_UrlInfo=
	|T_DI_FromObj<{browse_id: DU_Browse_Id;}>
	|T_DI_FromObj<{guide_entry_id: DU_GuideEntry_Id;}>
	|T_DI_FromObj<{playlist_id: DU_Playlist_Id;}>
	|T_DI_FromObj<{start_radio: DU_StartRadio;}>
	|T_DI_FromObj<{video_id: DU_VideoId;}>
	|T_DI_FromObj<{hashtag_id: DU_HashtagId;}>
	|T_DI_FromObj<{channel_id: DU_ChannelId;}>
	|T_DI_FromObj<{user_id: string;}>
	;
;
//#endregion
//#region DI+Extract
type DI_EX_YY=Extract<DI_AGR_UrlInfo,{c: any;}>["c"];
//#endregion
//#region DI_G
type DI_G_NoKey=
	|DI_A_ChannelId_UC
	|DI_G_BrowseId
	|DI_A_HashtagId
	|DI_A_PlayNext
	|DI_A_UserId
	|DI_A_VideoId
	|DI_VideoTime
	;
;
//#endregion
//#region PlaylistId (ABCZ)
type DI_A_Playlist_PL={
	a: "/item/a/b/c/z";
	b: "playlist_id";
	c: "PL";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"PL">;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD={
	a: "/item/a/b/c/z";
	b: "playlist_id";
	c: "RD";
	z: [
		T_DI_FromObj<{raw_id: `RD${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_CM_UC={
	a: "/item/a/b/c/z";
	b: "playlist_id";
	c: "RD:CM:UC";
	z: [
		T_DI_FromObj<{raw_id: `RDCMUC${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_GM_EM={
	a: "/item/a/b/c/z";
	b: "playlist_id";
	c: "RD:GM:EM";
	z: [
		T_DI_FromObj<{raw_id: `RDGMEM${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_MM={
	a: "/item/a/b/c/z";
	b: "playlist_id";
	c: "RD:MM";
	z: [
		T_DI_FromObj<{raw_id: `RDMM${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_UU={
	a: "/item/a/b/c/z";
	b: "playlist_id";
	c: "UU";
	z: [
		T_DI_FromObj<{raw_id: `UU${string}`;}>,
		T_DI_FromObj<{id: string;}>
	];
};
//#endregion
//#region BrowseId (ABCZ)
type DI_BrowseId_FE={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "FE";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"FE">;}>,
		T_DI_FromObj<{id: D_BrowseEndpointPages;}>
	];
};
type DI_BrowseId_MP={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "MP";
	z: [
		T_DI_FromObj<{raw_id: `MP${string}_${string}`;}>,
		T_DI_FromObj<{
			id: `${string}_${string}`;
			parts: [
				T_DI_FromObj<{id: string;}>,
				T_DI_FromObj<{data: "_";}>,
				T_DI_FromObj<{id: string;}>
			];
		}>,
	];
};
type DI_BrowseId_SP={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "SP";
	z: [
		T_DI_FromObj<{raw_id: `SP${G_BrowseIdStr_SP_Inner}`;}>,
		T_DI_FromObj<{id: G_BrowseIdStr_SP_Inner;}>,
	];
};
type DI_BrowseId_VL_LL={
	a: "/item/a/b/c/z";
	b: "browse_id";
	// ^ b = type
	c: "VL:LL";
	// ^ c = tag
	z: [
		T_DI_FromObj<{raw_id: "VLLL";}>,
		DI_A_Playlist_LL
	];
};
type DI_BrowseId_VL_PL={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "VL:PL";
	z: [
		KV_T_AKZ<"raw_id",T_PrimitiveBox<T_IdTemplate<"VL">>>,
		DI_A_Playlist_PL
	];
};
type DI_BrowseId_VL_UU={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "VL:UU";
	z: [T_DI_FromObj<{raw_id: `VLUU${string}`;}>];
};
type DI_BrowseId_VL_WL={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "VL:WL";
	z: [
		T_DI_FromObj<{raw_id: "VLWL";}>,
		DI_A_Playlist_WL
	];
};
//#endregion
//#region BrowseId (ABCZ)
type DI_BrowseId_UC={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "UC";
	z: [DI_A_ChannelId_UC];
};
type DI_BrowseId_VL_UC={
	a: "/item/a/b/c/z";
	b: "browse_id";
	c: "VL:UC";
	z: [
		T_DI_FromObj<{raw_id: `VL${T_IdTemplate<"UC",D_UserIdStr>}`;}>,
		DI_A_ChannelId_UC
	];
};
type DI_GuideEntry_UC={
	a: "/item/a/b/c/z"; b: "guide_entry_id"; c: "UC";
	z: [DI_A_ChannelId_UC];
};
type DI_GuideEntry_WL={
	a: "/item/a/b/c/z";
	b: "guide_entry_id";
	c: "WL";
	z: [DI_A_Playlist_WL];
};
type DI_R_Key_StartRadio={
	a: "/item/a/b/c/z";
	// ^ a = is
	b: "raw";
	// ^ b = type
	c: "key:start_radio";
	// ^ c = tag
	z: [DI_Key_StartRadio];
};
//#endregion
type DI_R_PlaylistId={
	a: "/item/a/b/c/z"; b: "raw"; c: "playlist_id";
	z: [T_DI_FromObj<{raw_id: DU_Playlist_Id;}>];
};
type DI_R_Radio_Playlist={
	a: "/item/a/b/c/z";
	b: "raw";
	c: "playlist_id:RD";
	z: [T_DI_FromObj<{raw_id: Extract<DU_Playlist_Id,`RD${string}`>;}>];
};
type DI_R_VideoId={
	a: "/item/a/b/c/z";
	b: "raw";
	c: "video_id";
	z: [T_DI_FromObj<{raw_id: DU_VideoId;}>];
};
//#region AZ
type DI_T_AZ<T>={a: DStr_DI_AZ; z: [T];};
//#endregion

//#region AKZ
// ~ a = is
// ~ k = type
type DI_Key_StartRadio=KV_T_AKZ<"key",T_DI_FromObj<{start_radio: 0|1;}>>;
type DI_A_UserId=KV_T_AKZ<"user_id",T_DI_FromObj<{raw_id: string;}>>;
type DI_A_VideoId=T_DI_FromObj2<{
	video_id: T_DI_FromObj<{
		raw_id: string;
	}>;
}>;
type DI_T_KV_Z_MakeItemGroup<K extends string,T>=KV_T_AKZ<K,make_item_group<T>>;
type DI_A_Playlist_LL={
	a: "key_value";
	k: "playlist_id";
	z: [T_DI_FromObj<{raw_id: "LL";}>];
};
type DI_A_Playlist_WL={
	a: "key_value";
	k: "playlist_id";
	z: [T_DI_FromObj<{raw_id: "WL";}>];
};
//#endregion
