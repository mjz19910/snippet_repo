type G_BoxedIdObj=
	|DSS_User_Id
	|DST_Channel_UC
	|DST_GuideEntry_LL
	|DST_GuideEntry_PL
	|DST_GuideEntry_UC
	|DST_GuideEntry_VL_LL
	|DST_GuideEntry_WL
	|DST_HashtagId
	|DST_KeySection
	|DST_LoadId
	|DST_Playlist_LL
	|DST_Playlist_PL
	|DST_Playlist_RD
	|DST_Playlist_RD_MM
	|DST_Playlist_WL
	|DST_Playlist_WL
	|DST_PlayNext
	|DST_SaveId
	|DST_UpdateId
	|DST_Video_Id
	|DST_Video_Id
	|DST_VideoTime
	|GST_Browse_Id
	|GST_DSS
	;
;
type DSS_Bigint=DSI_Item_ABD<bigint,"bigint">;
type DSS_Bigint_2={
	type: "boxed_id";
	tag: "bigint";
	key: `boxed_id:bigint:${string}`;
	z: [{_is: "group"; type: string; z: [make_item_group<bigint>];}];
};