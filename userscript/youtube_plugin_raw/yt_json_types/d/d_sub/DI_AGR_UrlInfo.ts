type DI_R_Key_StartRadio={
	a: "is:ABC";
	// ^ a = is
	b: "raw";
	// ^ b = type
	c: "key:start_radio";
	// ^ c = tag
	z: [DI_Key_StartRadio];
};
type DI_EX_YY=Extract<DI_AGR_UrlInfo,{c: any;}>["c"];
type DI_AGR_UrlInfo=
	|T_DI_FromObj<{browse_id: DU_Browse_Id;}>
	|T_DI_FromObj<{guide_entry_id: DU_GuideEntry_Id;}>
	|T_DI_FromObj<{playlist_id: DU_Playlist_Id;}>
	|T_DI_FromObj<{start_radio: DU_StartRadio;}>
	|T_DI_FromObj<{video_id: DU_VideoId;}>
	;
;
type DI_SpecialInfo=T_DI_FromObj<{raw_id: string;}>;
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
	z: [T_DI_FromObj<{start_radio: 0|1;}>];
};
