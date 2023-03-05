type DI_BrowseId_VL_WL={
	type: "browse_id";
	tag: "VL:WL";
	info_arr: [
		{raw_id: "VLWL";},
		DI_A_Playlist_WL,
	];
};
type DI_BrowseId_VL_LL={
	type: "browse_id";
	tag: "VL:LL";
	info_arr: [
		{raw_id: "VLLL";},
		DI_A_Playlist_LL,
	];
};
type DI_GuideEntry_LL={
	type: "guide_entry_id";
	tag: "LL";
	info_arr: [DI_A_Playlist_LL];
};

type DI_GuideEntry_WL={
	type: "guide_entry_id";
	tag: "WL";
	info_arr: [DI_A_Playlist_WL];
};

type DI_GuideEntry_PL={
	type: "guide_entry_id";
	tag: "PL";
	info_arr: [DI_A_Playlist_PL];
};

type GI_GuideEntry_Id=DI_GuideEntry_LL|DI_GuideEntry_WL|DI_GuideEntry_PL|DI_GuideEntryId_UC|DI_BrowseId_VL_LL;
type DI_GuideEntryId_UC={
	type: "guide_entry_id";
	tag: "UC";
	info_arr: [DI_A_ChannelId_UC];
};
type DI_BrowseId_VL_PL={
	type: "browse_id";
	tag: "VL:PL";
	info_arr: [
		{raw_id: T_IdTemplate<"VL">;},
		DI_A_Playlist_PL,
	];
};
type DI_BrowseId_VL_UC={
	type: "browse_id";
	tag: "VL:UC";
	info_arr: [
		{raw_id: `VL${T_IdTemplate<"UC",D_UserIdStr>}`;},
		DI_A_ChannelId_UC,
	];
};
type Y_PutBoxedArgs=
	|["bigint",null,[string,make_item_group<bigint>]]
	|["boolean",null,[string,make_item_group<boolean>]]
	|["browse_id","FE",DI_BrowseId_FE]
	|["browse_id","MP",DI_BrowseId_MP]
	|["browse_id","SP",DI_BrowseId_SP]
	|["browse_id","VL:LL",DI_BrowseId_VL_LL]
	|["browse_id","VL:PL",DI_BrowseId_VL_PL]
	|["browse_id","VL:UC",DI_BrowseId_VL_UC]
	|["browse_id","VL:WL",DI_BrowseId_VL_WL]
	|["channel_id","UC",DI_A_ChannelId_UC]
	|["hashtag_id",null,DI_HashtagId]
	|["keys",null,[string,make_item_group<string|number>]]
	|["load_id",null,number]
	|["number",null,[string,make_item_group<number>]]
	|["exact","play_next",DI_PlayNext]
	|["playlist_id","LL",DI_A_Playlist_LL]
	|["playlist_id","PL",DI_A_Playlist_PL]
	|["playlist_id","WL",DI_A_Playlist_WL]
	|["root_visual_element",null,[string,make_item_group<number>]]
	|["save_id",null,number]
	|["string",null,[string,make_item_group<string>]]
	|["user_id",null,DI_UserId]
	|["video_id",null,DI_VideoId]
	|["video_time",null,DI_VideoTime]
	|["guide_entry_id",null,GI_GuideEntry_Id]
	|["guide_entry_id","UC",DI_GuideEntryId_UC]
	|["playlist_id","RD",DI_A_Playlist_RD]
	|["playlist_id","UU",DI_A_Playlist_UU]
	|["playlist_id","RD:MM",DI_A_Playlist_RD_MM]
	|["playlist_id","RD:CM:UC",DI_A_Playlist_RD_CM_UC]
	|["playlist_id","RD:GM:EM",DI_A_Playlist_RD_GM_EM]
	|["key","start_radio",DI_Key_StartRadio]
	;
;
type Y_PutBoxedArgs_n3=Exclude<Y_PutBoxedArgs,{length: 3;}>;
type Y_PutBoxedArgs_3=Extract<Y_PutBoxedArgs,{length: 3;}>;
type Y_PutBoxedRet_3=Extract<Y_PutBoxedRet,{args: {length: 3;};}>;
async function fk_put_boxed_id(version: number,...args: Y_PutBoxedArgs) {
	let idb_cls=await import("../../../zc_child_modules/YTPlugin_IndexedDB.user.js");
	let dr: DefaultServiceResolver={value: null,listeners: []};
	let t=new idb_cls.IndexedDBService(dr);
	switch(args[0]) {
		default: throw new Error();
		case "video_time": {
			let [tag,,value]=args;
			let ret=t.put_box({
				type: "boxed_id",
				tag,
				key: `boxed_id:${tag}:${value.raw_value}`,
				value,
			},version);
			return {args,ret};
		}
	}
}
type T_PutAwaitPromise<T extends Y_PutBoxedRet>=T extends infer R extends T? {args: R["args"]; ret: Awaited<R["w"]>;}:never;
type T_PutMakeAsyncImpl<N extends string,T extends {
	info_arr: [{raw_id: Y;}];
},Y extends string=T["info_arr"][0]["raw_id"]>={
	key: N; args: [N,T];
	w: Promise<{
		type: "boxed_id";
		tag: N;
		key: `boxed_id:${N}`;
		value: T;
	}>;
};
type T_PutMakeAsync<N extends string,T extends {info_arr: [{raw_id: string;}];}>=T_PutMakeAsyncImpl<N,T>;
type Y_DI_Shape={
	type: string;
	info_arr: [{raw_id: string;}];
};
type TY_BoxedShape<T_Type extends string,T_Tag extends string,T_Value extends Y_DI_Shape>={
	type: T_Type;
	tag: T_Tag;
	key: `${T_Type}:${T_Tag}`;
	value: T_Value;
};
type Y_BoxedShape=TY_BoxedShape<string,string,Y_DI_Shape>;
type Y_PutBoxedRet={
	key: string;
	args: [string,DI_VideoId];
	w: Promise<Y_BoxedShape>;
};
type BScratch1=Extract<Y_PutBoxedArgs,["browse_id","FE",DI_BrowseId_FE]>;
type MakeInfoBoxArgs<T extends {type: any;}>=T extends infer R extends T? [R["type"],R]:never;
