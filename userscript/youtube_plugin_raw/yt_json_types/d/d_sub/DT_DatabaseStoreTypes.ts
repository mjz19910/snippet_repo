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
type DT_DatabaseStoreTypes={
	video_id: G_BoxedVideoId;
	hashtag_id: I_BoxedHashtagId;
	boxed_id: G_BoxedIdObj;
	channel_id: I_BoxedChannelId;
	playlist_id: G_PlaylistIdObj;
	browse_id: I_BoxedBrowseId;
	user_id: I_BoxedUserId;
};
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