type M_Empty_WCM=TM_Gen<{}>;
//#region M_VE
type M_VE3611={webCommandMetadata: GM_VE3611; resolveUrlCommandMetadata?: M_ResolveUrlCommand;};
type M_VE3832=TM_Gen<GM_VE3832>;
type M_VE3854={webCommandMetadata: GM_VE3854; resolveUrlCommandMetadata?: M_ResolveUrlCommand;};
type M_Search=TM_Gen<GM_Search>;
type M_VE5754=TM_Gen<GM_VE5754>;
type M_VE6827=TM_Gen<GM_VE6827>;
type M_VE11487=TM_Gen<GM_VE11487>;
type M_VE23462=TM_Gen<GM_VE23462>;
type M_VE37414=TM_Gen<GM_VE37414>;
type M_VE42352=TM_Gen<GM_VE42352>;
type M_Url=TM_Gen<GM_Url>;
type M_VE96368=TM_Gen<GM_VE96368>;
//#endregion
//#region M_
type M_AccountMenu=TM_Gen<GM_AccountMenu>;
type M_AddToPlaylistService=TM_Gen<GM_AddToPlaylistService>;
type M_Browse=TM_Gen<GM_Browse>;
type M_CreateBackstagePost=TM_Gen<GM_CreateBackstagePost>;
type M_CreateComment=TM_Gen<GM_CreateComment>;
type M_CreatePlaylist=TM_Gen<GM_CreatePlaylist>;
type M_EditPlaylist=TM_Gen<GM_EditPlaylist>;
type M_GetSettingsEditor=TM_Gen<GM_GetSettingsEditor>;
type M_Feedback=TM_Gen<GM_Feedback>;
type M_FlagGetForm=TM_Gen<GM_FlagGetForm>;
type M_GetNotificationMenu=TM_Gen<GM_GetNotificationMenu>;
type M_GetPdgBuyFlow=TM_Gen<GM_GetPdgBuyFlow>;
type M_GetSharePanel=TM_Gen<GM_GetSharePanel>;
type M_GetSurvey=TM_Gen<GM_GetSurvey>;
type M_GetTranscript=TM_Gen<GM_GetTranscript>;
type M_GetUnseenNotificationCount=TM_Gen<GM_GetUnseenNotificationCount>;
type M_GetWebPlayerSharePanel=TM_Gen<GM_GetWebPlayerSharePanel>;
type M_Like=TM_Gen<GM_Like>;
type M_Next=TM_Gen<GM_Next>;
type M_NotificationOptOut=TM_Gen<GM_NotificationOptOut>;
type M_RecordInteractions=TM_Gen<GM_RecordInteractions>;
type M_SendPost=TM_Gen<GM_SendPost>;
type M_SetSetting=TM_Gen<GM_SetSetting>;
type M_Subscribe=TM_Gen<GM_Subscribe>;
type M_Unsubscribe=TM_Gen<GM_Unsubscribe>;
type M_UserFeedback=TM_Gen<GM_UserFeedback>;
type M_YpcGetCart=TM_Gen<GM_YpcGetCart>;
type M_YpcGetOffers=TM_Gen<GM_YpcGetOffers>;
//#endregion
//#region MG_
type T_MG_AdLayout_2<T>={layoutType: T; layoutId: string;};
type T_MG_AdLayout_3<T>={layoutType: T; layoutId: string; adLayoutLoggingData: D_SerializedAdServingDataEntry;};
type MG_AdLayout_CompositePlayerBytes=T_MG_AdLayout_2<"LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES">;
type MG_AdLayout_DisplayTopLandscapeImage=T_MG_AdLayout_3<"LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE">;
type MG_AdLayout_DisplaySquareImage=T_MG_AdLayout_3<"LAYOUT_TYPE_DISPLAY_SQUARE_IMAGE">;
type MG_AdLayout_DisplayBillboardImageButtoned=T_MG_AdLayout_3<"LAYOUT_TYPE_VIDEO_DISPLAY_BILLBOARD_IMAGE_BUTTONED">;
type MG_AdLayout=
	|MG_AdLayout_DisplayBillboardImageButtoned
	|MG_AdLayout_CompositePlayerBytes
	|MG_AdLayout_DisplayTopLandscapeImage
	|MG_AdLayout_DisplaySquareImage
	;
;
type MP_NotificationsMenu={
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
	showLoadingSpinner: true;
};

//#endregion
