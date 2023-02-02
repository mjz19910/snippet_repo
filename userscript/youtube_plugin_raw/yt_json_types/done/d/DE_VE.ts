//#region DE_VE
type DE_VE<T>={browseId: T;};
type DE_VE3611_Browse={
	browseId: `UC${string}`;
	canonicalBaseUrl: `/@${string}`;
}|{
	browseId: `UC${string}`;
	params: string;
	canonicalBaseUrl: `/@${string}`;
};
type DE_VE3854_Browse=DE_VE<"FEwhat_to_watch">;
type DE_VE5754_Browse=DE_VE<GU_VE5754_Id>;
type DE_VE6827_NoParams=DE_VE<GU_VE6827_Id_1>;
type DE_VE6827_Params={browseId: GU_VE6827_Id_Params; params: string;};
type DE_VE6827_Browse=DE_VE6827_NoParams|DE_VE6827_Params;
type DE_VE11487_Browse=DE_VE<"SPunlimited">;
type DE_VE23462_Browse=DE_VE<GU_VE23462_Id>;
type DE_VE42352_Browse=DE_VE<"FEdownloads">;
type DE_VE96368_Browse=DE_VE<"FEsubscriptions">;
type DE_Subscribe={channelIds: ChannelId[]; params: string;};
type DE_WatchPlaylist={playlistId: `RD${string}`; index: 13; params: string;};
//#endregion
