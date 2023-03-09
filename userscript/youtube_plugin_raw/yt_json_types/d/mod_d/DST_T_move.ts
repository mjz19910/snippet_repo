type DST_abj_W_Key="/db/key/a/b/j/w/z";
type DMK_DST_ABJWZ<DI extends T_DI_A_WithId<string>,K extends string=DI extends T_DI_A_WithId<infer J>? J:never,J1 extends string=DI["b"],J2 extends string=DI['c']>={
	key: `boxed_id:${J1}:${J2}:${K}`;
	a: "ST:D"; b: "boxed_id"; j: `${DI['b']}:${DI['c']}`; w: DST_abj_W_Key; z: [DI];
};
type MK_DbItem_BZ<T extends {b: string; z: [T_DI_FromObj<{raw_id: string;}>];},J extends string=T["b"],K extends string=T extends {b: string; z: [T_DI_FromObj<{raw_id: infer I;}>];}? I:never>={
	key: `boxed_id:${J}:${K}`;
	a: "ST:D"; b: "boxed_id"; j: J; w: DST_abj_W_Key; z: [T];
};
type DST_T_abz_j<J=string,K extends string="browse_id:MP",X=any>={
	key: `boxed_id:${K}:${string}`;
	a: "ST:D"; b: "boxed_id"; j: J; w: DST_abj_W_Key; z: [X];
};
type mk_s2<IC extends string,J extends string,X>={key: `boxed_id:${J}:${IC}`; a: "ST:D"; b: "boxed_id"; j: J; z: [X];};
type DST_HashtagId={
	key: `boxed_id:hashtag_id:${string}`;
	a: "ST:D"; b: "boxed_id"; j: "hashtag_id"; w: DST_abj_W_Key; z: [DI_A_HashtagId];
};
type DST_Browse_MP={
	key: `boxed_id:browse_id:MP:${string}`;
	a: "ST:D";
	b: "boxed_id";
	j: "browse_id:MP";
	w: DST_abj_W_Key;
	z: [DI_BrowseId_MP];
};
type DST_Channel_UC={
	key: `boxed_id:channel_id:UC:${string}`;
	a: "ST:D"; b: "boxed_id"; j: "channel_id:UC"; w: DST_abj_W_Key; z: [DI_A_ChannelId_UC];
};
type DST_DB_Channel_UC=MK_DbItem_BCZ<DI_A_ChannelId_UC>;
type MK_DbItem_BCZ<T extends {
	b: string; c: string; z: [T_DI_FromObj<{
		raw_id: RI;
	}>,V];
},V extends T_DI_FromObj<{
	id: string;
}>=T["z"][1],RI extends string=TZ_SuccessorX3<T>>={
	key: `boxed_id:${T["b"]}:${T["c"]}:${V["z"][0]["z"][0]}`,a: "ST:D"; b: "boxed_id",j: `${T["b"]}:${T["c"]}`,w: DST_abj_W_Key,z: [T];
};
type DC_Tmp=MK_DbItem_BCZ<DI_A_ChannelId_UC>;
type DST_Video_Id={
	key: `boxed_id:video_id:${string}`;
	a: "ST:D"; b: "boxed_id"; j: "video_id"; w: DST_abj_W_Key; z: [DI_A_VideoId];
};
