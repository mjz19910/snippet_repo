type DI_R_Key_StartRadio={
	a: "is:ABC";
	// ^ a = is
	b: "raw";
	// ^ b = type
	c: "key:start_radio";
	// ^ c = tag
	z: [DIT_Item_AB<"start_radio",T_PrimitiveBox<0|1>>];
};
type DI_EX_YY=Extract<DI_AGR_UrlInfo,{c: any;}>["c"];
type DI_AGR_UrlInfo=
	|{a: "arr"; z: ["browse_id",DU_Browse_Id];}
	|{a: "arr"; z: ["guide_entry_id",DU_GuideEntry_Id];}
	|{a: "arr"; z: ["playlist_id",DU_Playlist_Id];}
	|{a: "arr"; z: ["video_id",DU_VideoId];}
	|{a: "arr"; z: ["start_radio",DU_StartRadio];}
	;
;
type DI_AGR_UrlInfo_2={a: "arr",b: ""; v: "";};
type DI_SpecialInfo={raw_id: string;};
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
type DI_Key_StartRadio={
	b: "key";
	// ^ b = type
	c: "start_radio";
	// ^ c = key
	z: DI_R_Key_StartRadio["z"];
};
type Gen_BrowseId=T_Info_RawId_BC_J<"raw",["browse_id"],DU_Browse_Id>;
