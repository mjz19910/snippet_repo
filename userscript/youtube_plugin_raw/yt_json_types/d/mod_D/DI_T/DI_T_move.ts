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
type DStr_DI_AKLZ=`/di/a/k/l/z`;
type DStr_DI_AKMZ=`/di/a/k/m/z`;
type DStr_DI_AKZ=`/di/a/k/z`;
type DStr_KV_ALZ=`/di/a/l/z`;
type DStr_DI_ALMZ=`/di/a/l/m/z`;
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
type MK_DIInfo1<T extends G_Primitives>={
	z: [T];
};
type MK_DIInfo2<M extends keyof B_IdTemplateArgs>={
	z: [T_IdTemplate<M>];
};
type MK_DIInfo3<T extends keyof B_IdTemplateArgs>={
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
	|MK_DIInfo1<DU_Browse_Id>
	|MK_DIInfo1<DU_GuideEntry_Id>
	|MK_DIInfo1<string>
	|MK_DIInfo1<DU_Playlist_Id>
	|MK_DIInfo1<DU_StartRadio>
	|MK_DIInfo1<string>
	|MK_DIInfo1<DU_VideoId>
	|MK_DIInfo1<DU_ChannelId>
	|MK_DIInfo1<T_IdTemplate<"PL">|DU_Playlist_Static>
	;
;
type MK_DIInfo4<T extends keyof B_IdTemplateArgs>={
	z: [T_IdTemplate<T>];
};
type BrowseId_VLInfo=MK_DIInfo2<"VL">;
type DI_RetInfo=
	|MK_DIInfo2<"FE">
	|MK_DIInfo2<"UC">
	|MK_DIInfo2<"VL">
	|MK_DIInfo2<"MP">
	|MK_DIInfo2<"SP">
	|MK_DIInfo4<"RDCMUC">
	|MK_DIInfo4<"RDGMEM">
	|MK_DIInfo3<"RDMM">
	|MK_DIInfo1<DU_Playlist_Static>
	|MK_DIInfo1<string>
	|MK_DIInfo1<DU_StartRadio>
	|MK_DIInfo1<string>
	|MK_DIInfo1<DU_VideoId>
	|MK_DIInfo2<"UC">
	|MK_DIInfo2<"PL">
	|MK_DIInfo2<"RD">
	|MK_DIInfo2<"UU">
	|MK_DIInfo1<DU_Playlist_Static>
	|MK_DIInfo2<"VL">
	|MK_DIInfo2<"UC">
	|MK_DIInfo2<"PL">
	|MK_DIInfo2<"PL">
	|MK_DIInfo1<DU_Playlist_Static>
	|{type: "RDCMUC"; exact: true; z: [`RDCMUC${string}`];}
	|{type: "RDGMEM"; exact: true; z: [`RDGMEM${string}`];}
	|{type: "RDGM"; exact: true; z: [`RDGM${string}`];}
	|{type: "RDCM"; exact: true; z: [`RDCM${string}`];}
	|{type: "RDMM"; exact: true; z: [`RDMM${string}`];}
	|{type: "PL"; exact: true; z: [`PL${string}`];}
	|{type: "FE"; exact: true; z: [`FE${string}`];}
	|{type: "MP"; exact: true; z: [`MP${string}`];}
	|{type: "RD"; exact: true; z: [`RD${string}`];}
	|{type: "SP"; exact: true; z: [`SP${string}`];}
	|{type: "UC"; exact: true; z: [`UC${string}`];}
	|{type: "UU"; exact: true; z: [`UU${string}`];}
	|{type: "VL"; exact: true; z: [`VL${string}`];}
	|{type: "WL"; exact: true; z: ["WL"];}
	|{type: "LL"; exact: true; z: ["LL"];}
	|{type: "string"; exact: false; z: [string];}
	|{type: "number"; exact: false; z: [number];}
	;
;
type DI_RetInfo_Test1=Exclude<DU_ChannelId,"RDGM"|"RDCMUC"|"RDMM"|"PL"|"RD"|"UU">;

//#endregion