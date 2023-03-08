type G_BoxedIdObj=
	|DST_Browse_MP
	|DST_Browse_SP
	|DST_Browse_VL_LL
	|DST_Browse_VL_PL
	|DST_Browse_VL_UC
	|DST_Browse_VL_WL
	|DST_User_Id
	|DST_Browse_FE
	|DST_Channel_UC
	|DST_GuideEntry_LL
	|DST_GuideEntry_PL
	|DST_GuideEntry_UC
	|DST_GuideEntry_VL_LL
	|DST_GuideEntry_WL
	|DST_HashtagId
	|DST_Key_StartRadio
	|DST_Key_StartRadio
	|DST_LoadId
	|DST_Playlist_LL
	|DST_Playlist_PL
	|DST_Playlist_RD
	|DST_Playlist_RD_CM_UC
	|DST_Playlist_RD_MM
	|DST_Playlist_WL
	|DST_PlayNext
	|DST_SaveId
	|DST_UpdateId
	|DST_Video_Id
	|DST_VideoTime
	|GST_DSS
	;
;
type G_BoxedPrintable=|G_BoxedIdObj;
type GB_A1=G_BoxedIdObj["z"][0];
type GB_A1_J_Shape=
	|`browse_id:${string}`
	|"play_next"
	|`playlist_id:${string}`
	|"user_id"
	|"channel_id:UC"
	|"guide_entry_id"
	|"hashtag_id"
	|"key"
	|"load_id"
	|"save_id"
	|"update_id"
	|"video_id"
	|"video_time"
	|"guide_entry_id:LL"
	|"guide_entry_id:VL:LL"
	;
;
type TP1=G_BoxedIdObj['key'] extends infer I?
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}:${infer f5}`? [f0,f1,f2,f3,f4,f5]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}`? [f0,f1,f2,f3,f4]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}`? [f0,f1,f2,f3]:
	I extends `${infer f0}:${infer f1}:${infer f2}`? [f0,f1,f2]:
	I extends `${infer f0}:${infer f1}`? [f0,f1]:[I]:never
	;
;
type TP3=[
	Join<Extract<TP1,[any,any]>,":">,
	// 3
	Join<Extract<TP1,[any,any,any]>,":">,
	// 4
	Join<Exclude<Extract<TP1,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	Join<Extract<Extract<TP1,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	// 5
	Join<Extract<TP1,[any,any,any,any,any]>,":">,
	// 6
	Join<Extract<TP1,[any,any,any,any,any,any]>,":">,
];
type GB_A1_Keys=G_BoxedIdObj extends infer V? V extends infer I? T_DistributedKeyof<Omit<I,"key"|"a"|"b"|"j"|"w"|"z">>:[]:[];
type GB_A1_KS1=Extract<G_BoxedIdObj,{w: any;}>;
type GB_A1_KS2=Extract<G_BoxedIdObj,{k: any;}>;
type GB_A1_J_Base="user_id"|"channel_id:UC"|"guide_entry_id:PL"|"guide_entry_id:UC";
type G_BoxedInner=
	|["z",G_BoxedIdObj]
	|["n"]
	|["a1",GB_A1]
	|[0,GST_DSS]
	|[1,{
		key: G_BoxedIdObj['key'];
		a: DST_PlayNext["a"]; b: "boxed_id";
		j: GB_A1_J_Shape;
		w: any;
	}|{
		key: G_BoxedIdObj['key'];
		a: DST_PlayNext["a"]; b: "boxed_id";
		j: GB_A1_J_Shape;
	}]
	|["k:sr",DST_Key_StartRadio]
	|[2,string,"many"|"one"|"arr"|"typeof_name"|"instance_name"|"string",string|string[]|string[][]]
	;
;
type G_BoxedInner_Tmp=[
	GST_DSS|null,
	Exclude<G_BoxedPrintable,{a: "SI:T:D";}>|null
];
type G_BoxedInner_Tmp_l=Exclude<G_BoxedPrintable,{a: "SI:T:D";}>;
