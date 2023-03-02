namespace DT_Database {
	const V_StoreKeys=(["video_id","hashtag_id","boxed_id","channel_id","playlist_id","browse_id"] as const) satisfies readonly (keyof DT_DatabaseStoreTypes)[];
	export type V_StoreKeys_=typeof V_StoreKeys;
}
type DT_DatabaseStoreKeys=DT_Database.V_StoreKeys_;
type IDBBoxedType={
	key: `video_id:normal:${string}`;
	type: "video_id:normal";
	base: "video_id",
	v: string;
}|{
	key: `video_id:shorts:${string}`;
	type: "video_id:shorts";
	base: "video_id";
	v: string;
}|{
	key: `hashtag_id:${string}`;
	type: "hashtag_id";
	hashtag: string;
}|G_BoxedIdObj|{
	key: `channel_id:UC:${string}`;
	base: "channel_id";
	type: "channel_id:UC";
	id: string;
	raw_id: `UC${string}`;
}|G_PlaylistIdObj|{
	key: `browse_id:VL:${string}`;
	base: "browse_id";
	type: "browse_id:VL";
	id: `PL${string}`;
	raw_id: `VLPL${string}`;
};

type DT_DatabaseStoreTypes={
	video_id: Extract<IDBBoxedType,{base: "video_id";}>;
	hashtag_id: Extract<IDBBoxedType,{type: "hashtag_id";}>;
	boxed_id: G_BoxedIdObj;
	channel_id: Extract<IDBBoxedType,{base: "channel_id";}>;
	playlist_id: Extract<IDBBoxedType,{base: "playlist_id";}>;
	browse_id: Extract<IDBBoxedType,{base: "browse_id";}>;
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
type G_PlaylistIdObj={
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
}|{
	key: `playlist_id:RDGM:EM:${string}`;
	base: "playlist_id";
	type: "playlist_id:RDGM";
	id: `EM${string}`;
	raw_id: `RDGMEM${string}`;
	id_info: {
		type: "EM";
		id: string;
		raw_id: `EM${string}`;
	};
}|{
	key: `playlist_id:self:${D_PlaylistSelfId}`;
	base: "playlist_id";
	type: "playlist_id:self";
	id: D_PlaylistSelfId;
}|{
	key: `playlist_id:${D_PlaylistIdTypeBase}:${string}`;
	base: "playlist_id";
	type: `playlist_id:${D_PlaylistIdTypeBase}`;
	id: string;
	raw_id: `${D_PlaylistIdTypeBase}${string}`;
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
type D_BoxedBoolStore=T_BoxedStore<boolean,"boolean">;
type D_BoxedKeysStore=T_BoxedStore<number|string,"keys">;
type D_BoxedStrStore=T_BoxedStore<string,"string">;
type D_BoxedNumStore=T_BoxedStore<number,"number">;
type G_BoxedIdObj=D_BoxedUpdateId|T_BoxedStore<number,"root_visual_element">|D_BoxedStrStore|D_BoxedNumStore|D_BoxedBoolStore|D_BoxedKeysStore;
type T_IdBox<SV extends G_IdSrc,T_IdType extends string,T extends SV["key_type"]=SV["key_type"],V=SV["type"]>={
	key: `boxed_id:${T}:${T_IdType}`;
	base: "boxed_id";
	type: T;
	id: T_IdType;
	value: make_item_group<V>;
};