//#region G_Boxed
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
//#endregion
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
type G_Boxed_StrExtract=G_BoxedIdObj['key'] extends infer I?
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}:${infer f5}`? [f0,f1,f2,f3,f4,f5]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}`? [f0,f1,f2,f3,f4]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}`? [f0,f1,f2,f3]:
	I extends `${infer f0}:${infer f1}:${infer f2}`? [f0,f1,f2]:
	I extends `${infer f0}:${infer f1}`? [f0,f1]:[I]:never
	;
;
type G_Boxed_StrArr=[
	Join<Extract<G_Boxed_StrExtract,[any,any]>,":">,
	// 3
	Join<Extract<G_Boxed_StrExtract,[any,any,any]>,":">,
	// 4
	Join<Exclude<Extract<G_Boxed_StrExtract,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	Join<Extract<Extract<G_Boxed_StrExtract,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	// 5
	Join<Extract<G_Boxed_StrExtract,[any,any,any,any,any]>,":">,
	// 6
	Join<Extract<G_Boxed_StrExtract,[any,any,any,any,any,any]>,":">,
];
type GB_A1_Keys=G_BoxedIdObj extends infer V? V extends infer I? T_DistributedKeyof<Omit<I,"key"|"a"|"b"|"j"|"w"|"z">>:[]:[];
type GB_A1_KS1=Extract<G_BoxedIdObj,{w: any;}>;
type GB_A1_KS2=Extract<G_BoxedIdObj,{k: any;}>;
type GB_A1_J_Base="user_id"|"channel_id:UC"|"guide_entry_id:PL"|"guide_entry_id:UC";
type G_BoxedInner=
	|["z",G_BoxedIdObj]
	|["n"]
	|["a1",GB_A1]
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
	|[2,[DSS_String,DIZ_Item_AB<string,string>,make_item_group<string>,string|string[]|string[][]],string,"many"|"one"|"arr"|"typeof_name"|"instance_name"|"string",string|string[]|string[][]]
	|[3,DSS_Bigint,Ret_w_dss<DSS_Bigint>]
	|[4,DSS_Boolean,Ret_w_dss<DSS_Boolean>]
	|[5,DSS_Keys,Ret_w_dss<DSS_Keys>]
	|[6,DSS_Number,Ret_w_dss<DSS_Number>]
	|[7,DSS_VE,Ret_w_dss<DSS_VE>]
	|[8,DSS_String,Ret_w_dss<DSS_String>]
	;
;
type Ret_w_diz<T extends DIZ_Item_AB<string,U>,U>=
	|["one",[U,any,T]]
	|["arr",[U[],any,T]]
	|["many",[U[][],any,T]]
	|["typeof_name",[T_GetTypeof<U>,any,T]]
	|["instance_name",[U,any,T]]
	;
;
type Ret_w_dss<T extends DSI_T_Item_ABD<any,any>>=
	["bigint",[T,Ret_w_diz<DIZ_Item_AB<string,T>,T>]]|
	["boolean",[T extends DSI_T_Item_ABD<"boolean",any>? T|{}:{},{}]]|
	T extends DSI_T_Item_ABD<"boolean",any>? ["boolean",[T,{}]]:
	T extends DSI_T_Item_ABD<"number",any>? ["number",[T,{}]]:
	T extends DSI_T_Item_ABD<"keys",any>? ["keys",[T,{}]]:
	T extends DSI_T_Item_ABD<"root_visual_element",any>? ["root_visual_element",[T,{}]]:
	T extends DSI_T_Item_ABD<"string",any>? ["string",[T,{}]]:
	never;
;
;
type Ret_T_W_DIZ=Ret_w_diz<DIZ_Item_AB<string,DSS_Bigint>,DSS_Bigint>;
function test_1(x: Ret_T_W_DIZ) {
	switch(x[0]) {
		case "one": {
			x[1];
		} break;
		case "arr":
		case "many":
		case "typeof_name":
		case "instance_name":
	}
}
type G_BoxedInner_Tmp=[
	GST_DSS|null,
	Exclude<G_BoxedPrintable,{a: "SI:T:D";}>|null
];
type G_BoxedInner_Tmp_l=Exclude<G_BoxedPrintable,{a: "SI:T:D";}>;
//#region DST_T
type DST_T_abz_j<J,X>={
	key: `boxed_id:browse_id:MP:${string}`;
	a: "ST:D"; b: "boxed_id"; j: J; w: "/db/key/a/b/j/w/z"; z: [X];
};
type DST_T_abz<T>=DST_T_abz_j<T,any>;
type OneKey<K extends string,V=any>={
	[P in K]: (Record<P,V>&Partial<Record<Exclude<K,P>,never>>) extends infer O? Decay<O>:never;
}[K];
type GW2<T>=T extends {z: [T_DI_FromObj<infer J extends {[U in string]: any}>];}? keyof J:never;
type GW1<T,K extends string>=T extends {z: [T_DI_FromObj<{[U in K]: infer W;}>];}? W:never;
type UB_Prim<T extends {z: [any];} extends {z: [T_DI_FromObj<{[U in string]: any}>];}? {}:never>=T extends {z: [T_DI_FromObj<infer A>];}? A[keyof A]:never;
type ip=UB_Prim<DI_Key_StartRadio>;
type UB_Obj<T>=T extends {z: [infer A];}? A:never;
type UB_obj2<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A extends {}>? A:never;
type Ub1=UB_Obj<DI_Key_StartRadio>;
type ub_obj=UB_obj2<Ub1>;
type G1_test1=GW2<DI_Key_StartRadio>;
type CQ=T_DI_FromObj<{
	start_radio: 0|1;
	id: "test";
}>;
//#endregion
