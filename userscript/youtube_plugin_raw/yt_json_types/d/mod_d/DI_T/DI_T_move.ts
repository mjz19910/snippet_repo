//#region DStr
type DStr_DI_AKLZ=`/di/a/k/l/z`;
type DStr_DI_AKZ=`/di/a/k/z`;
type DStr_DI_AZ=`/di/a/z`;

//#endregion
//#region T_DI
type T_DI_Raw<L extends string,M extends string,T>={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: L;
	m: M;
	z: [T];
};
type T_DI_Key_2<L extends string,T>={
	a: DStr_DI_AKLZ;
	k: "key";
	l: L;
	z: [T];
};
type T_DI_Raw_2<C extends string,T>={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: C;
	z: [T];
};
//#endregion
//#region AKLZ
type DI_T_Item_ABD<T_Type,T_Tag,T_InfoItem>={
	a: DStr_DI_AKLZ;
	k: T_Type;
	l: T_Tag;
	z: [T_InfoItem];
};
//#endregion
//#region AEZ
type T_PrimitiveBox<T>={
	a: DStr_DI_AKZ;
	k: T_GetPrimitiveTag<T>;
	z: [T];
};
type T_PrimitiveBox_E<T,E extends T_GetPrimitiveTag<T>>={
	a: DStr_DI_AKZ;
	k: E;
	z: [T];
};
type DIT_Box_Typeof2<T_Type extends T_GetPrimitiveTag<U>,U>={
	a: DStr_DI_AKZ;
	k: T_Type;
	z: [U];
};
//#endregion
//#region AKZ
type DI_SpecialInfo=T_DI_FromObj<{v: string;}>;
type MK_DIInfo1<T extends [string,string,G_Primitives]>={
	a: T[0];
	k: T[1];
	z: [T[2]];
};
type MK_DIInfo2<T_Arr extends [string,string,string],T extends string=T_IdTemplate<T_Arr[2]&keyof B_IdTemplateArgs>>={
	a: T_Arr[0];
	k: T_Arr[1];
	l: T_Arr[2];
	z: [T];
};
type MK_DIInfo3<T_Arr extends [string,string,string,string],T extends string=T_IdTemplate<T_Arr[2]&keyof B_IdTemplateArgs>>={
	a: T_Arr[0];
	k: T_Arr[1];
	l: T_Arr[2];
	m: T_Arr[3];
	z: [T];
};
type DI_SrcInfo=
	|MK_DIInfo1<["key","browse_id",DU_Browse_Id]>
	|MK_DIInfo1<["key","guide_entry_id",DU_GuideEntry_Id]>
	|MK_DIInfo1<["key","hashtag_id",string]>
	|MK_DIInfo1<["key","playlist_id",DU_Playlist_Id]>
	|MK_DIInfo1<["key","start_radio",DU_StartRadio]>
	|MK_DIInfo1<["key","user_id",string]>
	|MK_DIInfo1<["key","video_id",DU_VideoId]>
	|MK_DIInfo1<["key","channel_id",DU_ChannelId]>
	;
;
type DI_RetInfo=
	|MK_DIInfo1<["tag","user_id",string]>
	|MK_DIInfo1<["tag","hashtag_id",string]>
	|MK_DIInfo1<["tag","video_id",DU_VideoId]>
	|MK_DIInfo2<["tag","playlist_id","RD"],T_IdTemplate<"RD">>
	|MK_DIInfo2<["tag","playlist_id","PL"],T_IdTemplate<"PL">>
	|MK_DIInfo2<["tag","playlist_id","UU"],T_IdTemplate<"UU">>
	|MK_DIInfo2<["tag","channel_id","UC"],T_IdTemplate<"UC">>
	|MK_DIInfo1<["tag","start_radio",DU_StartRadio]>
	|{a: "tag",k: "playlist_id",l: "RD",m: "CM",n: "UC",z: [T_IdTemplate<"RDCMUC">];}
	|{a: "tag",k: "playlist_id",l: "RD",m: "GM",z: [T_IdTemplate<"RDGM">];}
	|{a: "tag",k: "playlist_id",l: "RD",m: "MM",z: [T_IdTemplate<"RDMM">];}
	|{a: "tag",k: "playlist_id",z: [DU_Playlist_Static];}
	|{a: null;}
	;
;
type DI_RetInfo_Test1=Exclude<DU_ChannelId,"RDGM"|"RDCMUC"|"RDMM"|"PL"|"RD"|"UU">;
//#endregion
//#region ABCZ
type DI_A_ChannelId_UC={
	a: DStr_DI_AKLZ;
	k: "channel_id";
	l: "UC";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"UC">;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_GuideEntry_LL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	l: "LL";
	z: [DI_A_Playlist_LL];
};
type DI_GuideEntry_PL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	l: "PL";
	z: [DI_A_Playlist_PL];
};
type DI_GuideEntry_VL_LL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	l: "VL:LL";
	z: [DI_BrowseId_VL_LL];
};
//#endregion
//#region ABZ
type DI_A_PlayNext={
	a: "/item/a/b/z";
	k: "play_next";
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
//#region PlaylistId (ABCZ)
type DI_A_Playlist_PL={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "PL";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"PL">;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD";
	z: [
		T_DI_FromObj<{raw_id: `RD${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_CM_UC={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD:CM:UC";
	z: [
		T_DI_FromObj<{raw_id: `RDCMUC${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_GM_EM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD:GM:EM";
	z: [
		T_DI_FromObj<{raw_id: `RDGMEM${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_MM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD:MM";
	z: [
		T_DI_FromObj<{raw_id: `RDMM${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_UU={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "UU";
	z: [
		T_DI_FromObj<{raw_id: `UU${string}`;}>,
		T_DI_FromObj<{id: string;}>
	];
};
//#endregion
//#region BrowseId (ABCZ)
type DI_BrowseId_FE={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "FE";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"FE">;}>,
		T_DI_FromObj<{id: D_BrowseEndpointPages;}>
	];
};
type DI_BrowseId_MP=T_DI_AKLZ<"browse_id","MP",[
	T_DI_FromObj<{raw_id: `MP${string}_${string}`;}>,
	T_DI_FromObj<{
		id: `${string}_${string}`;
		parts: [
			T_DI_FromObj<{id: string;}>,
			T_DI_FromObj<{data: "_";}>,
			T_DI_FromObj<{id: string;}>
		];
	}>
]>;
type T_DI_AKLZ<K,L,Z extends any[]>={
	a: DStr_DI_AKLZ;
	k: K;
	l: L;
	z: Z;
};
type DI_BrowseId_SP={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "SP";
	z: [
		T_DI_FromObj<{raw_id: `SP${G_BrowseIdStr_SP_Inner}`;}>,
		T_DI_FromObj<{id: G_BrowseIdStr_SP_Inner;}>,
	];
};
type DI_BrowseId_VL_LL={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "VL:LL";
	z: [
		T_DI_FromObj<{raw_id: "VLLL";}>,
		DI_A_Playlist_LL
	];
};
type DI_BrowseId_VL_PL={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "VL:PL";
	z: [
		KV_T_AKZ<"raw_id",T_PrimitiveBox<T_IdTemplate<"VL">>>,
		DI_A_Playlist_PL
	];
};
type DI_BrowseId_VL_UU={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "VL:UU";
	z: [T_DI_FromObj<{raw_id: `VLUU${string}`;}>];
};
type DI_BrowseId_VL_WL={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "VL:WL";
	z: [
		T_DI_FromObj<{raw_id: "VLWL";}>,
		DI_A_Playlist_WL
	];
};
//#endregion
//#region BrowseId (ACKZ)
type DI_BrowseId_UC={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "UC";
	z: [DI_A_ChannelId_UC];
};
type DI_BrowseId_VL_UC={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "VL:UC";
	z: [
		T_DI_FromObj<{raw_id: `VL${T_IdTemplate<"UC",D_UserIdStr>}`;}>,
		DI_A_ChannelId_UC
	];
};
type DI_GuideEntry_UC={
	a: DStr_DI_AKLZ; k: "guide_entry_id"; l: "UC";
	z: [DI_A_ChannelId_UC];
};
type DI_GuideEntry_WL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	l: "WL";
	z: [DI_A_Playlist_WL];
};
type DI_R_Key_StartRadio=T_DI_Raw<"key","start_radio",DI_Key_StartRadio>;
//#endregion
//#region (ACKZ)
type DI_R_PlaylistId={
	a: DStr_DI_AKLZ; k: "raw"; l: "playlist_id";
	z: [T_DI_FromObj<{raw_id: DU_Playlist_Id;}>];
};
type DI_R_Radio_Playlist={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: "playlist_id"; m: "RD";
	z: [T_DI_FromObj<{raw_id: Extract<DU_Playlist_Id,`RD${string}`>;}>];
};
type DI_R_VideoId={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: "video_id";
	z: [T_DI_FromObj<{raw_id: DU_VideoId;}>];
};
//#endregion
//#region AKZ
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
//#region AZ
type DI_T_AZ<T>={a: DStr_DI_AZ; z: [T];};
//#endregion
