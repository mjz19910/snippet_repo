namespace DT_Database {
	const V_StoreKeys=(["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"] as const) satisfies readonly (keyof DT_DatabaseStoreTypes)[];
	export type V_StoreKeys_=typeof V_StoreKeys;
}
type DT_DatabaseStoreKeys=DT_Database.V_StoreKeys_;
type I_BoxedVideoId={
	type: "video_id";
	type_parts: ["video_id","normal"];
	key: `video_id:normal:${string}`;
	v: string;
};
type I_BoxedVideoIdS={
	type: "video_id";
	key: `video_id:shorts:${string}`;
	type_parts: ["video_id","shorts"];
	v: string;
};
type I_BoxedHashtagId={
	type: "hashtag_id";
	key: `hashtag_id:${string}`;
	hashtag: string;
};
type I_BoxedChannelId={
	key: `channel_id:UC:${string}`;
	base: "channel_id";
	type_parts: ["channel_id","UC"];
	id: string;
	raw_id: `UC${string}`;
};
type I_BoxedBrowseId={
	base: "browse_id";
	key: `browse_id:VL:${string}`;
	type_parts: ["browse_id","VL"];
	id: D_PlaylistIdStr;
	raw_id: GU_VE5754_BrowseId;
};
type I_BoxedUserId={
	type: "user_id";
	key: `user_id:${string}`;
	id: string;
};
type I_BoxedRadio_1={
	key: `playlist_id:RDCM:UC:${string}`;
	base: "playlist_id";
	type: "playlist_id:RDCM";
	id: `UC${string}`;
	raw_id: `RDCMUC${string}`;
	id_info: {
		type: "UC";
		id: string;
		raw_id: `UC${string}`;
	};
};
type I_BoxedRadio_2={
	type: "playlist_id";
	type_parts: ["playlist_id","RDGM","EM"];
	key: `playlist_id:RDGM:EM:${string}`;
	id: `EM${string}`;
	raw_id: `RDGMEM${string}`;
	info_arr: [{type: "RDGM";},{type: "EM"; id: string;}];
};
type I_BoxedRadioSelf={
	key: `playlist_id:self:${D_PlaylistSelfId}`;
	base: "playlist_id";
	type: "playlist_id:self";
	id: D_PlaylistSelfId;
};
type I_BoxedRadioBase={
	key: `playlist_id:${D_PlaylistIdTypeBase}:${string}`;
	base: "playlist_id";
	type: `playlist_id:${D_PlaylistIdTypeBase}`;
	id: string;
	raw_id: `${D_PlaylistIdTypeBase}${string}`;
}|{
	key: `playlist_id:RDMM:${string}`;
	base: "playlist_id";
	type: `playlist_id:RDMM`;
	info: {
		type: "RDMM";
		id: string;
		raw_id: `RDMM${string}`;
	};
};
type IDBBoxedType=
	|G_BoxedIdObj
	|G_BoxedVideoId
	|G_PlaylistIdObj
	|I_BoxedBrowseId
	|I_BoxedChannelId
	|I_BoxedHashtagId
	|I_BoxedUserId
	;
;
type G_PlaylistIdObj=
	|I_BoxedRadio_1
	|I_BoxedRadio_2
	|I_BoxedRadioSelf
	|I_BoxedRadioBase
	;
;
type DT_DatabaseStoreTypes={
	video_id: G_BoxedVideoId;
	hashtag_id: I_BoxedHashtagId;
	boxed_id: G_BoxedIdObj;
	channel_id: I_BoxedChannelId;
	playlist_id: G_PlaylistIdObj;
	browse_id: I_BoxedBrowseId;
	user_id: I_BoxedUserId;
};
type DT_DatabaseValue=Extract<DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes],{value: any;}>;
type T_StoreCacheType<T extends keyof DT_DatabaseStoreTypes>={[R in T]?: T_CacheInfoType<R>};
type T_StoreCacheIndex<T extends keyof DT_DatabaseStoreTypes>={[R in T]?: [R,Map<string,number>]};
type StoreCacheType=T_StoreCacheType<keyof DT_DatabaseStoreTypes>;
type StoreCacheIndex=T_StoreCacheIndex<keyof DT_DatabaseStoreTypes>;
type T_CacheInfoType<T extends keyof DT_DatabaseStoreTypes>=[T,(DT_DatabaseStoreTypes[T]|null)[]];
type TypedIDBTransactionScope={
	tx: IDBTransaction;
	is_tx_complete: boolean;
	complete_promise: Promise<Event>;
	db: IDBDatabase,
	typed_db: TypedIndexedDB,
};
type B_IdSrcNum={
	key_type: "num";
	type: number;
};
type B_IdSrcStr={
	key_type: "str";
	type: string;
};
type G_IdSrc=B_IdSrcNum|B_IdSrcStr;
type D_BoxedUpdateId={
	key: "boxed_id:a:update_id";
	type: "update_id";
	base: "boxed_id";
	id: number;
}|{
	key: "boxed_id:a:load_id";
	type: "load_id";
	base: "boxed_id";
	id: number;
}|{
	key: "boxed_id:a:save_id";
	type: "save_id";
	base: "boxed_id";
	id: number;
};
type B_BoxedStoreTypeofToType={
	string: "keys"|"string";
	number: "number"|"root_visual_element";
	boolean: "boolean";
};
type T_BoxedStore<T,T_Type extends string>={
	key: `boxed_id:${T_Type}:${string}`;
	base: "boxed_id";
	type: T_Type;
	id: string;
	value: make_item_group<T>;
};
type D_BoxedBooleanStore=T_BoxedStore<boolean,"boolean">;
type D_BoxedKeysStore=T_BoxedStore<number|string,"keys">;
type D_BoxedStringStore=T_BoxedStore<string,"string">;
type D_BoxedNumberStore=T_BoxedStore<number,"number">;
type D_BoxedVEStore=T_BoxedStore<number,"root_visual_element">;
type D_BoxedBigintStore=T_BoxedStore<bigint,"bigint">;
type G_BoxedVideoId=I_BoxedVideoId|I_BoxedVideoIdS;
type T_IdBox<SV extends G_IdSrc,T_IdType extends string,T extends SV["key_type"]=SV["key_type"],V=SV["type"]>={
	key: `boxed_id:${T}:${T_IdType}`;
	base: "boxed_id";
	type: T;
	id: T_IdType;
	value: make_item_group<V>;
};