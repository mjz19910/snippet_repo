export type D_EmptyObj={};
export type M_Empty_WCM=TM_Gen<D_EmptyObj>;
//#region M_VE
export type M_VE3611={webCommandMetadata: GM_VE3611; resolveUrlCommandMetadata?: M_ResolveUrlCommand;};
export type M_VE3832=TM_Gen<GM_VE3832>;
export type M_VE3854={webCommandMetadata: GM_VE3854; resolveUrlCommandMetadata?: M_ResolveUrlCommand;};
export type M_Search=TM_Gen<GM_Search>;
export type M_VE5754=TM_Gen<GM_VE5754>;
export type M_VE6827=TM_Gen<GM_VE6827>;
export type M_VE11487=TM_Gen<GM_VE11487>;
export type M_VE23462=TM_Gen<GM_VE23462>;
export type M_VE37414=TM_Gen<GM_VE37414>;
export type M_VE42352=TM_Gen<GM_VE42352>;
export type M_Url=TM_Gen<GM_Url>;
export type M_VE96368=TM_Gen<GM_VE96368>;
//#endregion
//#region M_
export type M_AccountMenu=TM_Gen<GM_AccountMenu>;
export type M_AddToPlaylistService=TM_Gen<GM_AddToPlaylistService>;
export type M_Browse=TM_Gen<GM_Browse>;
export type M_CreateBackstagePost=TM_Gen<GM_CreateBackstagePost>;
export type M_CreateComment=TM_Gen<GM_CreateComment>;
export type M_CreatePlaylist=TM_Gen<GM_CreatePlaylist>;
export type M_EditPlaylist=TM_Gen<GM_EditPlaylist>;
export type M_GetSettingsEditor=TM_Gen<GM_GetSettingsEditor>;
export type M_Feedback=TM_Gen<GM_Feedback>;
export type M_FlagGetForm=TM_Gen<GM_FlagGetForm>;
export type M_GetNotificationMenu=TM_Gen<GM_GetNotificationMenu>;
export type M_GetPdgBuyFlow=TM_Gen<GM_GetPdgBuyFlow>;
export type M_GetSharePanel=TM_Gen<GM_GetSharePanel>;
export type M_GetSurvey=TM_Gen<GM_GetSurvey>;
export type M_GetTranscript=TM_Gen<GM_GetTranscript>;
export type M_GetUnseenNotificationCount=TM_Gen<GM_GetUnseenNotificationCount>;
export type M_GetWebPlayerSharePanel=TM_Gen<GM_GetWebPlayerSharePanel>;
export type M_Like=TM_Gen<GM_Like>;
export type M_Next=TM_Gen<GM_Next>;
export type M_NotificationOptOut=TM_Gen<GM_NotificationOptOut>;
export type M_RecordInteractions=TM_Gen<GM_RecordInteractions>;
export type M_SendPost=TM_Gen<GM_SendPost>;
export type M_SetSetting=TM_Gen<GM_SetSetting>;
export type M_Subscribe=TM_Gen<GM_Subscribe>;
export type M_Unsubscribe=TM_Gen<GM_Unsubscribe>;
export type M_UserFeedback=TM_Gen<GM_UserFeedback>;
export type M_YpcGetCart=TM_Gen<GM_YpcGetCart>;
export type M_YpcGetOffers=TM_Gen<GM_YpcGetOffers>;
//#endregion
//#region MG_
export type T_MG_AdLayout_2<T>={layoutType: T; layoutId: string;};
export type T_MG_AdLayout_3<T>={layoutType: T; layoutId: string; adLayoutLoggingData: D_SerializedAdServingDataEntry;};
export type MG_AdLayout_CompositePlayerBytes=T_MG_AdLayout_2<"LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES">;
export type MG_AdLayout_DisplayTopLandscapeImage=T_MG_AdLayout_3<"LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE">;
export type MG_AdLayout_DisplaySquareImage=T_MG_AdLayout_3<"LAYOUT_TYPE_DISPLAY_SQUARE_IMAGE">;
export type MG_AdLayout_DisplayBillboardImageButtoned=T_MG_AdLayout_3<"LAYOUT_TYPE_VIDEO_DISPLAY_BILLBOARD_IMAGE_BUTTONED">;
export type MG_AdLayout=
	|MG_AdLayout_DisplayBillboardImageButtoned
	|MG_AdLayout_CompositePlayerBytes
	|MG_AdLayout_DisplayTopLandscapeImage
	|MG_AdLayout_DisplaySquareImage
	;
;

//#endregion
