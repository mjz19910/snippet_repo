//#region WebCommandMetadata
//#region WebCommandMetadata like {rootVe:number;}
type GM_VE3611_WC={
	url:
	|`/channel/UC${string}`
	|`/@${string}`
	|"/gaming"
	;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE3832_Watch_WC={
	url: `/watch?${string}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type GM_VE3854_WC={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE4724_WC={
	url: `/results?search_query=${string}`;
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type GM_VE5754_WC={
	url: `/playlist?list=${"WL"|"LL"|`PL${string}`}`;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE6827_WC={
	url?: D_VE6827_PageUrl;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE11487_WC={
	url: "/premium";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487;
	apiUrl: "/youtubei/v1/browse";
};
//#endregion
type GM_PostApiLike={sendPost: true; apiUrl: string;};
//#region WebCommandMetadata like GM_PostApiLike ie, GM_ApiUrl
type GM_SetSetting=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/set_setting">;
type GM_AccountMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/account_menu">;
type GM_CreateBackstagePost=T_GM_PostApi_WithApiUrl<"/youtubei/v1/backstage/create_post">;
type GM_EditPlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse/edit_playlist">;
type GM_Browse=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse">;
type GM_CreateComment=T_GM_PostApi_WithApiUrl<"/youtubei/v1/comment/create_comment">;
type GM_Feedback=T_GM_PostApi_WithApiUrl<"/youtubei/v1/feedback">;
type GM_FlagGetForm=T_GM_PostApi_WithApiUrl<"/youtubei/v1/flag/get_form">;
type GM_GetSurvey=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_survey">;
type GM_GetTranscript=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_transcript">;
type GM_GetNotificationMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_notification_menu">;
type GM_Dislike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/dislike">;
type GM_Like=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/like">;
type GM_RemoveLike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/removelike">;
type GM_Next=T_GM_PostApi_WithApiUrl<"/youtubei/v1/next">;
type GM_GetUnseenNotificationCount=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_unseen_count">;
type GM_notification_opt_out=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/opt_out">;
type GM_RecordInteractions=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/record_interactions">;
type GM_CreatePlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/create">;
type GM_AddToPlaylistService=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_add_to_playlist">;
type GM_GetSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_share_panel">;
type GM_Subscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/subscribe">;
type GM_ypc_get_offers=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_offers">;
type GM_YpcGetCart=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_cart">;
//#endregion
type GM_SendPost={sendPost: true;};
//#endregion
