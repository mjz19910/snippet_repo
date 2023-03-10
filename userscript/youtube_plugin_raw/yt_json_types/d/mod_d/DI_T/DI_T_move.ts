//#region Templates


type MakeInfoInput_Len2=
	|{
		type: "PL";
		arr: ["playlist_id","PL"];
		raw_id: `PL${string}`;
	}
	|{
		type: "RD";
		arr: ["playlist_id","RD"];
		raw_id: `RD${string}`;
	}
	|{
		type: "UU";
		arr: ["playlist_id","UU"];
		raw_id: `UU${string}`;
	}
	;
;

//#endregion

//#region DStr
type DStr_DI_AKLMZ=`/di/a/k/l/m/z`;
type DStr_DI_ALM_Z=`/di/a/l/m/z`;
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
type MK_DIInfo1<K extends DI_SrcArr[1],T extends G_Primitives>={
	a: "key";
	k: K;
	z: [T];
};
type MK_DIInfo2<K extends DI_SrcArr[1],T extends keyof B_IdTemplateArgs>={
	a: "key";
	k: K;
	l: T;
	z: [T_IdTemplate<T>];
};
type MK_DIInfo3<T extends keyof B_IdTemplateArgs,K extends DI_SrcArr[1],L extends "RD",M extends "GM"|"MM">={
	a: "key";
	k: K;
	l: L;
	m: M;
	z: [T_IdTemplate<T>];
};
type DI_SrcArr=
	|["key","browse_id",DU_Browse_Id]
	|["key","guide_entry_id",DU_GuideEntry_Id]
	|["key","hashtag_id",string]
	|["key","playlist_id",DU_Playlist_Id]
	|["key","start_radio",DU_StartRadio]
	|["key","user_id",string]
	|["key","video_id",DU_VideoId]
	|["key","channel_id",DU_ChannelId]
	;
;
type DI_SrcInfo=
	|MK_DIInfo1<"browse_id",DU_Browse_Id>
	|MK_DIInfo1<"guide_entry_id",DU_GuideEntry_Id>
	|MK_DIInfo1<"hashtag_id",string>
	|MK_DIInfo1<"playlist_id",DU_Playlist_Id>
	|MK_DIInfo1<"start_radio",DU_StartRadio>
	|MK_DIInfo1<"user_id",string>
	|MK_DIInfo1<"video_id",DU_VideoId>
	|MK_DIInfo1<"channel_id",DU_ChannelId>
	;
;
type MK_DIInfo4<T extends keyof B_IdTemplateArgs,T1 extends DI_SrcArr[1],L extends "RD",M extends "CM",N extends "UC">={
	a: "tag";
	k: T1;
	l: L;
	m: M;
	n: N;
	z: [T_IdTemplate<T>];
};
type DI_RetInfo=
	|MK_DIInfo2<"browse_id","FE">
	|MK_DIInfo2<"browse_id","UC">
	|MK_DIInfo2<"browse_id","VL">
	|MK_DIInfo2<"browse_id","MP">
	|MK_DIInfo2<"browse_id","SP">
	|MK_DIInfo1<"browse_id",never>
	|MK_DIInfo4<"RDCMUC","playlist_id","RD","CM","UC">
	|MK_DIInfo3<"RDGM","playlist_id","RD","GM">
	|MK_DIInfo3<"RDMM","playlist_id","RD","MM">
	|MK_DIInfo1<"playlist_id",DU_Playlist_Static>
	|MK_DIInfo1<"hashtag_id",string>
	|MK_DIInfo1<"start_radio",DU_StartRadio>
	|MK_DIInfo1<"user_id",string>
	|MK_DIInfo1<"video_id",DU_VideoId>
	|MK_DIInfo2<"channel_id","UC">
	|MK_DIInfo2<"playlist_id","PL">
	|MK_DIInfo2<"playlist_id","RD">
	|MK_DIInfo2<"playlist_id","UU">
	|MK_DIInfo1<"guide_entry_id",DU_Playlist_Static>
	|MK_DIInfo2<"guide_entry_id","VL">
	|MK_DIInfo2<"guide_entry_id","UC">
	|MK_DIInfo2<"guide_entry_id","PL">
	|{a: null;}
	;
;
type DI_RetInfo_Test1=Exclude<DU_ChannelId,"RDGM"|"RDCMUC"|"RDMM"|"PL"|"RD"|"UU">;
//#endregion
//#region ABCZ
type DI_A_ChannelId_UC={
	a: DStr_DI_ALM_Z;
	// k is reserved
	l: "channel_id";
	m: "UC";
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
	a: DStr_DI_AKLMZ;
	k: "guide_entry_id";
	l: "VL"; m: "LL";
	z: [DI_BrowseId_VL_LL];
};
//#endregion
//#region ABZ
type DI_A_PlayNext={
	a: "/di/a/k/z";
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
	l: "RD"; m: "CM"; n: "UC";
	z: [
		T_DI_FromObj<{raw_id: `RDCMUC${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_GM_EM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD"; m: "GM"; n: "EM";
	z: [
		T_DI_FromObj<{raw_id: `RDGMEM${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
type DI_A_Playlist_RD_GM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD"; m: "GM";
	z: [
		T_DI_FromObj<{raw_id: `RDGM${string}`;}>,
		T_DI_FromObj<{id: string;}>,
	];
	next?: DI_A_Playlist_RD_GM_EM;
};
type DI_A_Playlist_RD_MM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD";
	m: "MM";
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
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "LL";
	z: [
		T_DI_FromObj<{raw_id: "VLLL";}>,
		DI_A_Playlist_LL
	];
};
type DI_BrowseId_VL_PL={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "PL";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"VL">;}>,
		DI_A_Playlist_PL
	];
};
type DI_BrowseId_VL_UU={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "UU";
	z: [T_DI_FromObj<{raw_id: `VLUU${string}`;}>];
};
type DI_BrowseId_VL_WL={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "WL";
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
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "UC";
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
type DI_Key_StartRadio=T_DI_FromObj<{key: T_DI_FromObj<{start_radio: 0|1;}>;}>;
type DI_A_UserId=T_DI_FromObj<{user_id: T_DI_FromObj<{raw_id: string;}>;}>;
type DI_A_VideoId=T_DI_FromObj2<{video_id: T_DI_FromObj<{raw_id: string;}>;}>;
type DI_T_KV_Z_MakeItemGroup<K extends string,T>=KV_T_AKZ<K,make_item_group<T>>;
type DI_A_Playlist_LL={
	a: DStr_DI_AKZ;
	k: "playlist_id";
	z: [T_DI_FromObj<{raw_id: "LL";}>];
};
type DI_A_Playlist_WL={
	a: DStr_DI_AKZ;
	k: "playlist_id";
	z: [T_DI_FromObj<{raw_id: "WL";}>];
};
//#endregion
//#region AZ
type DI_T_AZ<T>={a: DStr_DI_AZ; z: [T];};
//#endregion
