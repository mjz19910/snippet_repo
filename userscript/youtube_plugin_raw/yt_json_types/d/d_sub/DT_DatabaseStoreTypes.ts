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
type G_PlaylistIdObj={
	key: `playlist_id:RDCM:UC${string}`;
	base: "playlist_id";
	type: "playlist_id:RDCM";
	id: `UC${string}`;
	raw_id: `RDCMUC${string}`;
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
type G_BoxedIdObj=T_IdBox<B_IdSrcNum,string>|T_IdBox<B_IdSrcStr,string>|{
	key: "boxed_id:update_id";
	type: "update_id";
	base: "boxed_id";
	id: number;
}|{
	key: `boxed_id:boolean:${string}`;
	base: "boxed_id";
	type: "boolean";
	id: string;
	value: make_arr_t<boolean>|make_many_t<boolean>;
};
type T_IdBox<SV extends G_IdSrc,T_IdType extends string,T extends SV["key_type"]=SV["key_type"],V=SV["type"]>={
	key: `boxed_id:${T}:${T_IdType}`;
	base: "boxed_id";
	type: T;
	id: T_IdType;
	value: [`many_${T}`,make_arr_t<V>|make_many_t<V>];
};
