type Y_PutBoxedArgs=
	|["bigint",string,make_item_group<bigint>]
	|["load_id"|"save_id",number]
	|["root_visual_element"|"number",string,make_item_group<number>]
	|["string",string,make_item_group<string>]
	|["keys",string,make_item_group<string|number>]
	|["boolean",string,make_item_group<boolean>]
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
type Y_PutBoxedRet={
	args: ["video_referral",D_VideoReferralUrlInfo];
	ret: Promise<{
		type: "boxed_id";
		tag: "video_referral";
		key: `boxed_id:video_referral:${string}`;
		value: D_VideoReferralUrlInfo;
	}|null>;
}|{
	args: ["video",D_UrlInfo_Video];
	ret: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:null:${string}`;
		value: D_UrlInfo_Video;
	}|null>;
}|{
	args: ["video",D_VideoIdNormal];
	ret: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:normal:${string}`;
		value: D_VideoIdNormal;
	}|null>;
}|{
	args: ["video",D_InfoVideoIdShorts];
	ret: Promise<{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:short:${string}`;
		value: D_InfoVideoIdShorts;
	}|null>;
}|{
	args: ["user_id",D_UserIdInfo];
	ret: Promise<{
		type: "boxed_id";
		tag: "user_id";
		extra: "any";
		key: `boxed_id:user_id:${string}`;
		value: D_UserIdInfo;
	}|null>;
}|{
	args: ["play_next",D_PlayNextUrlInfo];
	ret: Promise<{
		type: "boxed_id";
		tag: "play_next";
		extra: "any";
		key: "boxed_id:play_next:1";
		value: D_PlayNextUrlInfo;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_2];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:LL";
		value: G_PlaylistUrlInfo_2;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_PL];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:PL";
		value: G_PlaylistUrlInfo_PL;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RD];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:RD";
		value: G_PlaylistUrlInfo_RD;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RDCM];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: `boxed_id:playlist_id:RDCM:UC:${string}`;
		value: G_PlaylistUrlInfo_RDCM;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RDGM];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:RDGM";
		value: G_PlaylistUrlInfo_RDGM;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_RDMM];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:RDMM";
		value: G_PlaylistUrlInfo_RDMM;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_UU];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:UU";
		value: G_PlaylistUrlInfo_UU;
	}|null>;
}|{
	args: ["playlist_id",G_PlaylistUrlInfo_1];
	ret: Promise<{
		type: "boxed_id";
		tag: "playlist_id";
		extra: "any";
		key: "boxed_id:playlist_id:WL";
		value: G_PlaylistUrlInfo_1;
	}|null>;
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
