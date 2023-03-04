type Y_PutBoxedArgs=
	|["bigint",string,make_item_group<bigint>]
	|["boolean",string,make_item_group<boolean>]
	|["browse_id","FE",DI_BrowseId_FE]
	|["browse_id","SP",DI_BrowseId_SP]
	|["browse_id",DI_G_BrowseId]
	|["channel_id",DI_ChannelUrl]
	|["hashtag_id",DI_HashtagId]
	|["keys",string,make_item_group<string|number>]
	|["load_id",number]
	|["number",string,make_item_group<number>]
	|["play_next",DI_PlayNext]
	|["playlist_id",DI_G_Playlist]
	|["root_visual_element",string,make_item_group<number>]
	|["save_id",number]
	|["string",string,make_item_group<string>]
	|["user_id",DI_UserId]
	|["video_id",DI_VideoId]
	|["video_time",DI_VideoTime]
	;
;
async function fk_put_boxed_id(version: number,...args: Y_PutBoxedArgs) {
	let idb_cls=await import("../../../zc_child_modules/YTPlugin_IndexedDB.user.js");
	let dr: DefaultServiceResolver={value: null,listeners: []};
	let t=new idb_cls.IndexedDBService(dr);
	switch(args[0]) {
		default: throw new Error();
		case "video_time": {
			let [a,value]=args;
			let ret=t.put_box({
				type: "boxed_id",
				tag: a,
				key: `boxed_id:${a}:${value.raw_value}`,
				value,
			},version);
			return {args,ret};
		}
	}
}
type T_PutAwaitPromise<T extends Y_PutBoxedRet>=T extends infer R extends T? {args: R["args"]; ret: Awaited<R["promise"]>;}:never;
type T_PutMakeAsyncImpl<N extends string,T extends {
	info_arr: [{raw_id: Y;}];
},Y extends string=T["info_arr"][0]["raw_id"]>={
	args: [N,T];
	promise: Promise<{
		type: "boxed_id";
		tag: N;
		key: `boxed_id:${N}`;
		value: T;
	}>;
};
type T_PutMakeAsync<N extends string,T extends {info_arr: [{raw_id: string;}];}>=T_PutMakeAsyncImpl<N,T>;
type Y_PutBoxedRet=T_PutMakeAsync<"video_id",DI_VideoId>|{
	args: ["video",DI_VideoId];
	promise: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:null:${string}`;
		value: DI_VideoId;
	}>;
}|{
	args: ["user_id",DI_UserId];
	promise: Promise<{
		type: "boxed_id";
		tag: "user_id";
		key: `boxed_id:user_id:${string}`;
		value: DI_UserId;
	}>;
}|{
	args: ["play_next",DI_PlayNext];
	promise: Promise<{
		type: "boxed_id";
		tag: "play_next";
		key: "boxed_id:play_next:1";
		value: DI_PlayNext;
	}>;
}|{
	args: ["playlist_id",DI_Playlist_PL];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		key: "boxed_id:playlist_id:PL";
		value: DI_Playlist_PL;
	}>;
}|{
	args: ["playlist_id","RD",DI_A_Playlist_RD];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		key: "boxed_id:playlist_id:RD";
		value: DI_A_Playlist_RD;
	}>;
}|{
	args: ["playlist_id","RD:CM:UC",DI_A_Playlist_RD_CM_UC];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		key: `boxed_id:playlist_id:RD:CM:UC:${string}`;
		value: DI_A_Playlist_RD_CM_UC;
	}>;
}|{
	args: ["playlist_id","RD:GM:EM",DI_A_Playlist_RD_GM_EM];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		key: `boxed_id:playlist_id:RD:GM:EM:${string}`;
		value: DI_A_Playlist_RD_GM_EM;
	}>;
}|{
	args: ["playlist_id","RD:MM",DI_A_Playlist_RD_MM];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		key: `boxed_id:playlist_id:RD:MM:${string}`;
		value: DI_A_Playlist_RD_MM;
	}>;
}|{
	args: ["playlist_id",DI_G_Playlist_UU];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		key: "boxed_id:playlist_id:UU";
		value: DI_G_Playlist_UU;
	}>;
}|{
	args: ["hashtag_id",DI_HashtagId];
	promise: Promise<{
		type: "boxed_id";
		tag: "hashtag_id";
		key: `boxed_id:hashtag_id:${string}`;
		value: DI_HashtagId;
	}>;
}|{
	args: ["browse_id",DI_G_BrowseId];
	promise: Promise<{
		type: "boxed_id";
		tag: "browse_id";
		key: `boxed_id:browse_id:VLPL${string}`;
		value: DI_G_BrowseId;
	}>;
}|{
	args: ["channel_id",DI_ChannelUrl];
	promise: Promise<{
		type: "boxed_id";
		tag: "channel_id";
		key: `boxed_id:channel_id:UC${string}`;
		value: DI_ChannelUrl;
	}>;
}|{
	args: ["video_time",DI_VideoTime];
	promise: Promise<{
		type: "boxed_id";
		tag: "video_time";
		key: `boxed_id:video_time:${number}s`;
		value: DI_VideoTime;
	}>;
}|{
	args: ["bigint",string,make_item_group<bigint>];
	promise: Promise<{
		key: `boxed_id:bigint:${string}`;
		base: "boxed_id";
		type: "bigint";
		id: string;
		value: make_item_group<bigint>;
	}>;
}|{
	args: ["boolean",string,make_item_group<boolean>];
	promise: Promise<{
		key: `boxed_id:boolean:${string}`;
		base: "boxed_id";
		type: "boolean";
		id: string;
		value: make_item_group<boolean>;
	}>;
}|{
	args: ["number",string,make_item_group<number>];
	promise: Promise<{
		key: `boxed_id:number:${string}`;
		base: "boxed_id";
		type: "number";
		id: string;
		value: make_item_group<number>;
	}>;
}|{
	args: ["string",string,make_item_group<string>];
	promise: Promise<{
		key: `boxed_id:string:${string}`;
		base: "boxed_id";
		type: "string";
		id: string;
		value: make_item_group<string>;
	}>;
}|{
	args: ["keys",string,make_item_group<string|number>];
	promise: Promise<{
		key: `boxed_id:keys:${string}`;
		base: "boxed_id";
		type: "keys";
		id: string;
		value: make_item_group<string|number>;
	}>;
}|{
	args: ["root_visual_element",string,make_item_group<number>];
	promise: Promise<{
		key: `boxed_id:root_visual_element:${string}`;
		base: "boxed_id";
		type: "root_visual_element";
		id: string;
		value: make_item_group<number>;
	}>;
}|{
	args: ["load_id",number];
	promise: Promise<{
		key: "boxed_id:a:load_id";
		type: "load_id";
		base: "boxed_id";
		id: number;
	}>;
}|{
	args: ["save_id",number];
	promise: Promise<{
		key: "boxed_id:a:save_id";
		type: "save_id";
		base: "boxed_id";
		id: number;
	}>;
};
type YScratch=Exclude<Y_PutBoxedRet,{args: ["boolean"|"bigint"|"load_id"|"save_id"|"number"|"keys"|"root_visual_element"|"string",...any];}>;
type BScratch=Extract<G_BoxedIdObj,{type: "boxed_id";}>;
type MakeInfoBoxArgs<T extends {type: any;}>=T extends infer R extends T? [R["type"],R]:never;
