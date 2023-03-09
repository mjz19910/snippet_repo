//#region G_Boxed
type G_BoxedDatabaseData=
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
;
type GB_A1_Keys=G_BoxedDatabaseData extends infer V? V extends infer I? T_DistributedKeyof<Omit<I,"key"|"a"|"b"|"j"|"w"|"z">>:[]:[];
type GB_A1_KS1=Extract<G_BoxedDatabaseData,{w: any;}>;
type GB_A1_KS2=Extract<G_BoxedDatabaseData,{k: any;}>;
type GB_A1_J_Base="user_id"|"channel_id:UC"|"guide_entry_id:PL"|"guide_entry_id:UC";
type G_BoxedDSS={};
type Ret_w_diz<T extends DIZ_Item_AB<string,U>,U>=
	|["one",["1",U],T['z'][0],T]
	|["arr",["2",U[]],T['z'][0],T]
	|["many",["3",U[][]],T['z'][0],T]
	|["typeof_name",["t",T_GetTypeof<U>],T['z'][0],T]
	|["instance_name",["i","array"],T['z'][0],T]
	;
;
type Ret_W_DSS_Impl<T extends DSI_T_Item_ABD<J,Y>,J extends keyof J_StoreTypeMap,Y>=[
	J,
	string,
	["1",Y]|["2",Y[]]|["3",any[][]]|["t",string]|["i","array"],
	make_item_group<Y>,
	DIZ_Item_AB<string,Y>,
	T,
];
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
	Exclude<G_BoxedDatabaseData,{a: "SI:T:D";}>|null
];
type G_BoxedInner_Tmp_l=Exclude<G_BoxedDatabaseData,{a: "SI:T:D";}>;
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
