//#region GM_WC
type GM_WC_VE=[
	GM_VE3611_WC,
	GM_VE3832_Watch_WC,
	GM_VE3854_WC,
	GM_VE4724_WC,
	GM_VE5754_WC,
	GM_VE6827_WC,
	GM_VE11487_WC,
	GM_VE23462_WC,
	GM_VE37414_WC,
	GM_VE42352_WC,
	GM_VE83769_WC,
	GM_VE96368_WC_browse,
][number];
type GM_WC_PostApi=[
	GM_SetSetting,
	GM_AccountMenu,
	GM_CreateBackstagePost,
	GM_EditPlaylist,
	GM_Browse,
	GM_CreateComment,
	GM_Feedback,
	GM_FlagGetForm,
	GM_GetSurvey,
	GM_GetTranscript,
	GM_GetNotificationMenu,
	GM_Dislike,
	GM_LikeLike,
	GM_RemoveLike,
	GM_Next,
	GM_GetUnseenNotificationCount,
	GM_notification_opt_out,
	GM_RecordInteractions,
	GM_CreatePlaylist,
	GM_AddToPlaylistService,
	GM_SendPost,
	GM_GetSharePanel,
	GM_Subscribe,
	GM_ypc_get_offers,
	GM_YpcGetCart,
][number];
type GM_WC=[
	GM_WC_VE,
	GM_WC_PostApi
][number];
//#endregion
