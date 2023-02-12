type M_Empty_WCM=TM_Gen<{}>;
type M_GetPdgBuyFlow=TM_Gen<GM_GetPdgBuyFlow>;
type M_VE3854_ResolveUrl={webCommandMetadata: GM_VE3854_WC; resolveUrlCommandMetadata: GM_VE3854_ResolveUrl_C_MD;};
//#region M_VE
type M_VE3611=TM_Gen<GM_VE3611_WC>;
type M_VE3832_Watch=TM_Gen<GM_VE3832_Watch>;
type M_VE3832_WatchPlaylist=TM_Gen<GM_VE3832_WatchPlaylist>;
type M_VE3854=TM_Gen<GM_VE3854_WC>;
type M_VE4724=TM_Gen<GM_VE4724_WC>;
type M_VE5754=TM_Gen<GM_VE5754_WC>;
type M_VE6827_Browse_SearchBox=TM_Gen<GM_VE6827_Browse_SearchBox>;
type M_VE6827=TM_Gen<GM_VE6827_WC>;
type M_VE11487=TM_Gen<GM_VE11487_WC>;
type M_VE23462=TM_Gen<GM_VE23462_WC>;
type M_VE37414=TM_Gen<GM_VE37414_WC>;
type M_VE42352=TM_Gen<GM_VE42352_WC>;
type M_VE83769=TM_Gen<GM_VE83769_WC>;
type M_VE96368=TM_Gen<GM_VE96368_WC_browse>;
//#endregion
//#region M_
type M_AccountMenu=TM_Gen<GM_AccountMenu>;
type M_AddToPlaylistService=TM_Gen<GM_AddToPlaylistService>;
type M_Browse=TM_Gen<GM_Browse>;
type M_CreateBackstagePost=TM_Gen<GM_CreateBackstagePost>;
type M_CreateComment=TM_Gen<GM_CreateComment>;
type M_CreatePlaylist=TM_Gen<GM_CreatePlaylist>;
type M_EditPlaylist=TM_Gen<GM_EditPlaylist>;
type M_Feedback=TM_Gen<GM_Feedback>;
type M_FlagGetForm=TM_Gen<GM_FlagGetForm>;
type M_GetNotificationMenu=TM_Gen<GM_GetNotificationMenu>;
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
//#endregion
//#region MG_
type MG_AdLayout_PlayerBytes={layoutType: "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES"; layoutId: string;};
type MG_AdLayout_TopImage={layoutType: "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE"; layoutId: string; adLayoutLoggingData: D_AdLayoutLoggingData;};
type MG_AdLayout=MG_AdLayout_PlayerBytes|MG_AdLayout_TopImage;
//#endregion
type MP_AccountMenu={trackingParams: string; style: "MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT"; showLoadingSpinner: true;};
