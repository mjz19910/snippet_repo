type DST_Channel_UC={
	key: `boxed_id:channel_id:UC:${string}`;
	a: "ST:D"; b: "boxed_id"; j: "channel_id:UC"; w: "/db/key/a/b/j/w/z"; z: [DI_A_ChannelId_UC];
};
type DST_DB_Channel_UC=MK_DbItem_BCZ<DI_A_ChannelId_UC>;
type MK_DbItem_BCZ<T extends {b: string; c: string; z: [any,T_DI_FromObj<{id: string;}>];},V extends T_DI_FromObj<{id: string;}>=T["z"][1]>={
	key: `boxed_id:${T["b"]}:${T["c"]}:${V["z"][0]["z"][0]}`,a: "ST:D"; b: "boxed_id",j: `${T["b"]}:${T["c"]}`,w: "/db/key/a/b/j/w/z",z: [T];
};
type DC_Tmp=MK_DbItem_BCZ<DI_A_ChannelId_UC>;