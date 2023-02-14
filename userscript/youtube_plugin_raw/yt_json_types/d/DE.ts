//#region String Enum
type DE_AdPlacementKind=T_EnumStr<"AD_PLACEMENT_KIND","END"|"SELF_START"|"START">;
type DE_OpportunityType=T_EnumStr<"OPPORTUNITY_TYPE",T_EnumStr<"ORGANIC",T_EnumStr<"BROWSE"|"WATCH_NEXT","RESPONSE_RECEIVED">>>;
type DE_IconType_Button=
	|"SETTINGS"|"DELETE"
	|"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
	|"CHEVRON_RIGHT"|"CHEVRON_LEFT"|"REMOVE"|"INFO"|"CLOSE"|"MICROPHONE_ON"
	;
;
type DE_MP_MenuStyle=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE",
	|"SWITCHER"
	|"CREATION"
	|"NOTIFICATIONS"
	|"ACCOUNT"
>;
//#endregion
//#region DE_VE
type DE_VE<T>={browseId: T;};
type DE_VE3611={params?: string; browseId: `UC${string}`; canonicalBaseUrl: `/@${string}`; query?: string;};
type DE_VE3854=DE_VE<"FEwhat_to_watch">;
type DE_VE5754=DE_VE<GU_VE5754_Id>;
type DE_VE6827_FeedHistory={browseId: "FEhistory"; query: "";};
type DE_VE6827={browseId: GU_VE6827_Id|GU_VE6827_Id; params?: string;};
type DE_VE6827_NoParams=DE_VE<GU_VE6827_Id>;
type DE_VE6827_Params={params: string; browseId: GU_VE6827_Id;};
type DE_VE11487=DE_VE<"SPunlimited">;
type DE_VE23462=DE_VE<GU_VE23462_Id>;
type DE_VE42352=DE_VE<"FEdownloads">;
type DE_VE96368=DE_VE<"FEsubscriptions">;
//#endregion
//#region DE_
type DE_Subscribe={params: string; channelIds: D_ChannelId[];};
type DE_Unsubscribe={params: string; channelIds: `UC${string}`[];};
type DE_UserFeedback={
	additionalDatas: G_AdditionalDataItem[];
}|{
	hack: true;
	bucketIdentifier: "live_chat";
};
type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
type DE_YpcGetCart={transactionParams: string;};
type DE_SuperThanksSelectedTier={key: string; index: number;};
type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
//#endregion
//#region Partial Objects from Discriminated Unions
type DE_MutationItem=DU_MutationReplace|DU_MutationDelete;
//#endregion
