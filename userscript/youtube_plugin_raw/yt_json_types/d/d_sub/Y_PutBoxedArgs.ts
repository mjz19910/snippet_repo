type Y_PutBoxedArgs=
	|["bigint",string,make_item_group<bigint>]
	|["boolean",string,make_item_group<boolean>]
	|["keys",string,make_item_group<string|number>]
	|["load_id",number]
	|["number",string,make_item_group<number>]
	|["root_visual_element",string,make_item_group<number>]
	|["save_id",number]
	|["string",string,make_item_group<string>]
	|["browse_id",D_BrowseIdInfo]
	|MakeInfoBoxArgs<G_UrlInfo>
	;
;
async function fk_put_boxed_id(version: number,...args: Y_PutBoxedArgs) {
	let idb_cls=await import("../../../zc_child_modules/YTPlugin_IndexedDB.user.js");
	let dr: DefaultServiceResolver={value: null,listeners: []};
	let t=new idb_cls.IndexedDBService(dr);
	switch(args[0]) {
		default: throw new Error();
		case "video_referral": {
			let [a,value]=args;
			let ret=t.put_box({
				type: "boxed_id",
				tag: a,
				key: `boxed_id:${a}:${value.raw_id}`,
				value: value,
			},version);
			return {args,ret};
		}
	}
}
type T_PutAwaitPromise<T extends Y_PutBoxedRet>=T extends infer R extends T? {args: R["args"]; ret: Awaited<R["promise"]>;}:never;
type Y_PutBoxedRet={
	args: ["video_referral",D_VideoReferralUrlInfo];
	promise: Promise<{
		type: "boxed_id";
		tag: "video_referral";
		key: `boxed_id:video_referral:${string}`;
		value: D_VideoReferralUrlInfo;
	}>;
}|{
	args: ["video",D_UrlInfo_Video];
	promise: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:null:${string}`;
		value: D_UrlInfo_Video;
	}>;
}|{
	args: ["video",D_VideoIdNormal];
	promise: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:normal:${string}`;
		value: D_VideoIdNormal;
	}>;
}|{
	args: ["video",D_InfoVideoIdShorts];
	promise: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:short:${string}`;
		value: D_InfoVideoIdShorts;
	}>;
}|{
	args: ["user_id",D_UserIdInfo];
	promise: Promise<{
		type: "boxed_id";
		tag: "user_id";
		extra: "any";
		key: `boxed_id:user_id:${string}`;
		value: D_UserIdInfo;
	}>;
}|{
	args: ["play_next",D_PlayNextUrlInfo];
	promise: Promise<{
		type: "boxed_id";
		tag: "play_next";
		extra: "any";
		key: "boxed_id:play_next:1";
		value: D_PlayNextUrlInfo;
	}>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_PL];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:PL";
		value: G_PlaylistUrlInfo_PL;
	}>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RD];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:RD";
		value: G_PlaylistUrlInfo_RD;
	}>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RDCM];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: `boxed_id:playlist_id:RDCM:UC:${string}`;
		value: G_PlaylistUrlInfo_RDCM;
	}>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RDGM];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:RDGM";
		value: G_PlaylistUrlInfo_RDGM;
	}>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RDMM];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:RDMM";
		value: G_PlaylistUrlInfo_RDMM;
	}>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_UU];
	promise: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:UU";
		value: G_PlaylistUrlInfo_UU;
	}>;
}|{
	args: ["hashtag_id",D_InfoHashtagId];
	promise: Promise<{
		type: "boxed_id";
		tag: "hashtag_id";
		extra: "any";
		key: `boxed_id:hashtag_id:${string}`;
		value: D_InfoHashtagId;
	}>;
}|{
	args: ["browse_id",D_BrowseIdInfo];
	promise: Promise<{
		type: "boxed_id";
		tag: "browse_id";
		extra: "any";
		key: `boxed_id:browse_id:VLPL${string}`;
		value: D_BrowseIdInfo;
	}>;
}|{
	args: ["channel_id",D_ChannelUrlInfo];
	promise: Promise<{
		type: "boxed_id";
		tag: "channel_id";
		extra: "any";
		key: `boxed_id:channel_id:UC${string}`;
		value: D_ChannelUrlInfo;
	}>;
}|{
	args: ["video_time",D_InfoVideoTime];
	promise: Promise<{
		type: "boxed_id";
		tag: "video_time";
		key: `boxed_id:video_time:${number}s`;
		value: D_InfoVideoTime;
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
type MakeRawInfoBoxArgs<T extends G_RawUrlInfo>=
	T extends infer R extends T?
	R["type_parts"] extends infer A extends R["type_parts"]?
	A extends ["raw",...infer A2]?
	[...A2,R]
	:never
	:never
	:never
	;
;
