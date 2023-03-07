type DI_R_Key_StartRadio={
	a: "DI:R";
	// ^ a = is
	b: "raw";
	// ^ b = type
	c: "key:start_radio";
	// ^ c = tag
	w: "a/b/c/w/z";
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
type DI_SrcInfo_Any={
	k: "any";
	raw_id: DU_Browse_Id|DU_GuideEntry_Id|DU_Playlist_Id;
};
type DI_RetInfo={
	a: "tag"; k: "any"; c: "FE";
	raw_id: T_IdTemplate<"FE">;
}|{
	a: "tag"; k: "any"; c: "SP";
	raw_id: T_IdTemplate<"SP">;
}|{
	a: "tag"; k: "any"; c: "VL";
	raw_id: T_IdTemplate<"VL">;
}|{
	a: "tag"; k: "any"; c: "UC";
	raw_id: T_IdTemplate<"UC">;
}|{
	a: "tag"; k: "any"; c: "PL";
	raw_id: T_IdTemplate<"PL">;
}|{
	a: "tag"; k: "any"; c: "MP";
	raw_id: T_IdTemplate<"MP">;
}|{
	a: "tag"; k: "any"; c: "UU";
	raw_id: T_IdTemplate<"UU">;
}|{
	a: "tag"; k: "any"; c: "RD";
	raw_id: Extract<DU_Playlist_Id,`RD${string}`>;
}|{
	a: "tag"; k: "any"; c: null;
	raw_id: DU_Playlist_Static;
}|{
	a: "tag"; k: "video_id"; c: null; raw_id: DU_VideoId;
}|{
	a: "tag"; k: "start_radio";
	raw_id: DU_StartRadio;
}|{
	a: null;
};
type SP1<A extends [string,string]>=A[0] extends infer EA extends A[0]? EA extends infer I? {b: I; raw_id: A[1];}:never:never;
type SP2=SP1<["start_radio"|"video_id","a"|"b"]>;
type DI_SrcInfo=
	|DI_SrcInfo_Any
	|{k: "start_radio"; v: DU_StartRadio;}
	|{k: "video_id"; v: DU_VideoId;};
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
	a: "DI";
	b: "key";
	// ^ b = type
	c: "start_radio";
	// ^ c = key
	w: "/a/b/c/w/z";
	z: [T_DI_FromObj<{start_radio: 0|1;}>];
};