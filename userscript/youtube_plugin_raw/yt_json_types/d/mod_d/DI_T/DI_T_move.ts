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
type T_DI_Raw<L extends string,T>={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: L;
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
type DI_SpecialInfo=T_DI_FromObj2<{v: string;}>;
type MK_DIInfo1<K extends DI_SrcArr[1],T extends G_Primitives>={
	a: "/key/a/k/z";
	k: K;
	z: [T];
};
type MK_DIInfo2<K extends DI_SrcArr[1],M extends keyof B_IdTemplateArgs>={
	a: "/key/a/k/m/z";
	k: K;
	m: M;
	z: [T_IdTemplate<M>];
};
type MK_DIInfo3<T extends keyof B_IdTemplateArgs,K extends DI_SrcArr[1],L extends "RD",M extends "GM"|"MM">={
	a: "/key/a/k/l/m/z";
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
	|["key","guide_entry_id:playlist_id",`PL${string}`]
	|["key","guide_entry_id:playlist_id",DU_Playlist_Static]
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
	|MK_DIInfo1<"guide_entry_id:playlist_id",T_IdTemplate<"PL">|DU_Playlist_Static>
	;
;
type MK_DIInfo4<T extends keyof B_IdTemplateArgs,T1 extends DI_SrcArr[1],L extends "RD",M extends "CM",N extends "UC">={
	a: "/key/a/k/l/m/n/z";
	k: T1;
	l: L;
	m: M;
	n: N;
	z: [T_IdTemplate<T>];
};
type BrowseId_VLInfo=MK_DIInfo2<"browse_id","VL">;
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
	|MK_DIInfo2<"guide_entry_id:playlist_id","PL">
	|MK_DIInfo1<"guide_entry_id:playlist_id",DU_Playlist_Static>
	|{a: null;}
	;
;
type DI_RetInfo_Test1=Exclude<DU_ChannelId,"RDGM"|"RDCMUC"|"RDMM"|"PL"|"RD"|"UU">;
type X_ChannelId_UC=T_DI_RawIdBox<T_IdTemplate<"UC">>;

//#endregion
//#region ABCZ
type DI_A_ChannelId_UC={
	a: DStr_DI_ALM_Z;
	// k is reserved
	l: "channel_id";
	m: "UC";
	z: [
		X_ChannelId_UC,
		T_DI_IdBox<string>,
	];
};
type DI_A_GuideEntry_LL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	l: "LL";
	z: [DI_A_Playlist_LL];
};
type DI_GuideEntry_PL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	m: "PL";
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
		T_DI_RawIdBox<`${1}`>,
		T_DI_IdBox<1>
	];
};
//#endregion
//#region DI_AGR
type DI_AGR_UrlInfo=
	|T_DI_FromObj2<{browse_id: DU_Browse_Id;}>
	|T_DI_FromObj2<{guide_entry_id: DU_GuideEntry_Id;}>
	|T_DI_FromObj2<{playlist_id: DU_Playlist_Id;}>
	|T_DI_FromObj2<{start_radio: DU_StartRadio;}>
	|T_DI_FromObj2<{video_id: DU_VideoId;}>
	|T_DI_FromObj2<{hashtag_id: DU_HashtagId;}>
	|T_DI_FromObj2<{channel_id: DU_ChannelId;}>
	|T_DI_FromObj2<{user_id: string;}>
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
	m: "PL";
	z: [
		T_DI_RawIdBox<T_IdTemplate<"PL">>,
		T_DI_IdBox<string>,
	];
};
type DI_A_Playlist_RD={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD";
	z: [
		T_DI_RawIdBox<`RD${string}`>,
		T_DI_IdBox<string>,
	];
};
type DI_A_Playlist_RD_CM_UC={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD"; m: "CM"; n: "UC";
	z: [
		T_DI_RawIdBox<`RDCMUC${string}`>,
		T_DI_IdBox<string>,
	];
};
type DI_A_Playlist_RD_GM_EM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD"; m: "GM"; n: "EM";
	z: [
		T_DI_RawIdBox<`RDGMEM${string}`>,
		T_DI_IdBox<string>,
	];
};
type DI_A_Playlist_RD_GM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD"; m: "GM";
	z: [
		T_DI_RawIdBox<`RDGM${string}`>,
		T_DI_IdBox<string>,
	];
	next?: DI_A_Playlist_RD_GM_EM;
};
type DI_A_Playlist_RD_MM={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "RD";
	m: "MM";
	z: [
		T_DI_RawIdBox<`RDMM${string}`>,
		T_DI_IdBox<string>,
	];
};
type DI_A_Playlist_UU={
	a: DStr_DI_AKLZ;
	k: "playlist_id";
	l: "UU";
	z: [
		T_DI_RawIdBox<`UU${string}`>,
		T_DI_IdBox<string>
	];
};
//#endregion
//#region BrowseId (ABCZ)
type DI_BrowseId_FE={
	a: DStr_DI_AKLZ;
	k: "browse_id";
	l: "FE";
	z: [
		T_DI_RawIdBox<T_IdTemplate<"FE">>,
		T_DI_FromObj2<{id: D_BrowseEndpointPages;}>
	];
};
type DI_BrowseId_MP=T_DI_AKLZ<"browse_id","MP",[
	T_DI_RawIdBox<`MP${string}_${string}`>,
	T_DI_FromObjEx<{
		id: `${string}_${string}`;
		parts: [
			T_DI_IdBox<string>,
			T_DI_IdBox<"_">,
			T_DI_IdBox<string>
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
		T_DI_RawIdBox<`SP${G_BrowseIdStr_SP_Inner}`>,
		T_DI_FromObj2<{id: G_BrowseIdStr_SP_Inner;}>,
	];
};
type DI_BrowseId_VL_LL={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "LL";
	z: [
		T_DI_RawIdBox<"VLLL">,
		DI_A_Playlist_LL
	];
};
type DI_BrowseId_VL_PL={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "PL";
	z: [
		T_DI_RawIdBox<T_IdTemplate<"VL">>,
		DI_A_Playlist_PL
	];
};
type DI_BrowseId_VL_UU={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "UU";
	z: [T_DI_RawIdBox<`VLUU${string}`>];
};
type DI_BrowseId_VL_WL={
	a: DStr_DI_AKLMZ;
	k: "browse_id";
	l: "VL"; m: "WL";
	z: [
		T_DI_RawIdBox<"VLWL">,
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
		T_DI_RawIdBox<`VL${T_IdTemplate<"UC",D_UserIdStr>}`>,
		DI_A_ChannelId_UC
	];
};
type DI_GuideEntry_UC={
	a: DStr_DI_AKLZ; k: "guide_entry_id"; l: "UC";
	z: [DI_A_ChannelId_UC];
};
type DI_GuideEntry_VL={
	a: DStr_DI_AKLZ; b: "raw"; k: "guide_entry_id"; l: "VL";
	z: [T_DI_RawIdBox<T_IdTemplate<"VL">>];
};
type DI_A_GuideEntry_WL={
	a: DStr_DI_AKLZ;
	k: "guide_entry_id";
	l: "WL";
	z: [DI_A_Playlist_WL];
};
type DI_R_Key_StartRadio=T_DI_Raw<"start_radio",DI_A_StartRadio>;
//#endregion
//#region (ACKZ)
type DI_R_PlaylistId={
	a: DStr_DI_AKLZ; k: "raw"; l: "playlist_id";
	z: [T_DI_RawIdBox<DU_Playlist_Id>];
};
type DI_R_Radio_Playlist={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: "playlist_id"; m: "RD";
	z: [T_DI_RawIdBox<Extract<DU_Playlist_Id,`RD${string}`>>];
};
type DI_R_VideoId={
	a: DStr_DI_AKLZ;
	k: "raw";
	l: "video_id";
	z: [T_DI_RawIdBox<DU_VideoId>];
};
//#endregion
//#region AKZ
type DI_A_StartRadio=DI_RawIdContainer<"start_radio",0|1>;
type DI_A_UserId=DI_RawIdContainer<"user_id",DU_UserId>;
type DI_A_VideoId=DI_RawIdContainer<"video_id",DU_VideoId>;
type DI_A_Playlist_LL=DI_RawIdContainer<"playlist_id","LL">;
type DI_A_Playlist_WL=DI_RawIdContainer<"playlist_id","WL">;
type DI_RawIdContainer<K1 extends string,T>=T_DI_FromObj2<{[U in K1]: T_DI_RawIdBox<T>}>;
//#endregion
