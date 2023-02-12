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
type DE_VE3611_Browse={params?: string; browseId: `UC${string}`; canonicalBaseUrl: `/@${string}`; query?: string;};
type DE_VE3854_Browse=DE_VE<"FEwhat_to_watch">;
type DE_VE5754_Browse=DE_VE<GU_VE5754_Id>;
type DE_VE6827_Browse_SearchBox={browseId: "FEhistory"; query: "";};
type DE_VE6827_Browse=DE_VE6827_NoParams|DE_VE6827_Params;
type DE_VE6827_NoParams=DE_VE<GU_VE6827_Id_1>;
type DE_VE6827_Params={params: string; browseId: GU_VE6827_Id_Params;};
type DE_VE11487_Browse=DE_VE<"SPunlimited">;
type DE_VE23462_Browse=DE_VE<GU_VE23462_Id>;
type DE_VE42352_Browse=DE_VE<"FEdownloads">;
type DE_VE96368_Browse=DE_VE<"FEsubscriptions">;
//#endregion
//#region DE_
type DE_Subscribe={params: string; channelIds: D_ChannelId[];};
type DE_Unsubscribe={params: string; channelIds: `UC${string}`[];};
type DE_UserFeedback={additionalDatas: G_AdditionalDataItem[];};
type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
type DE_YpcGetCart={transactionParams: string;};
type DE_SuperThanksSelectedTier={key: string; index: number;};
type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
//#endregion
