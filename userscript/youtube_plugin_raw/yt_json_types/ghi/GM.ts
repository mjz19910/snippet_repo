//#region WebCommandMetadata
//#region WebCommandMetadata Objects
type GM_PostApiLike={sendPost: true; apiUrl: string;};
type GM_SendPost={sendPost: true;};
type GM_UserFeedback={ignoreNavigation: true;};
//#endregion
//#region GM_VE
type GM_VE_WC_Browse=GE_Browse_WCM["webCommandMetadata"];
type M_ResolveUrlCommand={
	parentTrackingParams?: string;
	isVanityUrl?: true;
};
//#endregion
//#region WebCommandMetadata like {rootVe:number;}

type GM_VE3611={
	url: GU_VE3611_Url;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE3832={
	url: `/watch?${string}`|`/playlist?list=RD${string}&playnext=1&index=${number}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type GM_VE3854={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE4724={
	url: D_ResultsPageUrl;
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};

type GM_VE5754={
	url: GU_VE5754_Url;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE6827={
	url?: GU_VE6827_Url;
	sendPost?: true;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827;
	apiUrl: "/youtubei/v1/browse";
};

type GM_VE11487={
	url: GU_VE11487_Url;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE23462={
	url: GU_VE23462_Url;
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE37414={
	url: GU_VE37414_Url;
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type GM_VE42352={
	url: GU_VE42352_Url;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 42352;
	apiUrl: "/youtubei/v1/browse";
};
type GM_Url={
	url: GU_VE83769_Url;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type GM_VE96368={
	url: GU_VE96368_Url;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
//#endregion
//#region WebCommandMetadata with T_GM_PostApi_WithApiUrl
type GM_AccountMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/account_menu">;
type GM_AddToPlaylistService=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_add_to_playlist">;
type GM_Browse=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse">;
type GM_CreateBackstagePost=T_GM_PostApi_WithApiUrl<"/youtubei/v1/backstage/create_post">;
type GM_CreateComment=T_GM_PostApi_WithApiUrl<"/youtubei/v1/comment/create_comment">;
type GM_CreatePlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/create">;
type GM_Dislike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/dislike">;
type GM_EditPlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse/edit_playlist">;
type GM_GetSettingsEditor=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_settings_editor">;
type GM_Feedback=T_GM_PostApi_WithApiUrl<"/youtubei/v1/feedback">;
type GM_FlagGetForm=T_GM_PostApi_WithApiUrl<"/youtubei/v1/flag/get_form">;
type GM_GetNotificationMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_notification_menu">;
type GM_GetPdgBuyFlow=T_GM_PostApi_WithApiUrl<"/youtubei/v1/pdg/get_pdg_buy_flow">;
type GM_GetSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_share_panel">;
type GM_GetSurvey=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_survey">;
type GM_GetTranscript=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_transcript">;
type GM_GetUnseenNotificationCount=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_unseen_count">;
type GM_GetWebPlayerSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_web_player_share_panel">;
type GM_Like=GM_LikeLike|GM_Dislike|GM_RemoveLike;
type GM_LikeLike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/like">;
type GM_Next=T_GM_PostApi_WithApiUrl<"/youtubei/v1/next">;
type GM_NotificationOptOut=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/opt_out">;
type GM_RecordInteractions=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/record_interactions">;
type GM_RemoveLike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/removelike">;
type GM_SetSetting=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/set_setting">;
type GM_Subscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/subscribe">;
type GM_Unsubscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/unsubscribe">;
type GM_YpcGetOffers=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_offers">;
type GM_YpcGetCart=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_cart">;
//#endregion
//#endregion
//#region GM_VE
type GM_VE=
	|GM_VE3611
	|GM_VE3832
	|GM_VE3854
	|GM_VE4724
	|GM_VE5754
	|GM_VE6827
	|GM_VE11487
	|GM_VE12924
	|GM_VE23462
	|GM_VE37414
	|GM_VE42352
	|GM_Url
	|GM_VE96368
	;
;
type D_GM_VeNum=Extract<GM_All,{rootVe:any}>['rootVe'];
type GM_PostApi=
	|GM_SetSetting
	|GM_AccountMenu
	|GM_CreateBackstagePost
	|GM_EditPlaylist
	|GM_Browse
	|GM_CreateComment
	|GM_Feedback
	|GM_FlagGetForm
	|GM_GetSurvey
	|GM_GetTranscript
	|GM_GetNotificationMenu
	|GM_Dislike
	|GM_LikeLike
	|GM_RemoveLike
	|GM_Next
	|GM_GetUnseenNotificationCount
	|GM_NotificationOptOut
	|GM_RecordInteractions
	|GM_CreatePlaylist
	|GM_AddToPlaylistService
	|GM_SendPost
	|GM_GetSharePanel
	|GM_Subscribe
	|GM_YpcGetOffers
	|GM_YpcGetCart
	;
;
type GM_All=[
	GM_VE,
	GM_PostApi
][number];
//#endregion
