//#region GM_WC
type GM_WC=[
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
	GM_account_set_setting,
	GM_AccountMenu,
	GM_backstage_create_post,
	GM_browse_edit_playlist,
	GM_Browse,
	GM_comment_create_comment,
	GM_feedback,
	GM_flag_get_form,
	GM_get_survey,
	GM_get_transcript,
	GM_GetNotificationMenu,
	GM_like_dislike,
	GM_like_like,
	GM_like_removelike,
	GM_Next,
	GM_notification_get_unseen_count,
	GM_notification_opt_out,
	GM_notification_record_interactions,
	GM_playlist_create,
	GM_playlist_get_add_to_playlist,
	GM_SendPost,
	GM_share_get_share_panel,
	GM_subscription_subscribe,
	GM_ypc_get_offers,
	GM_YpcGetCart,
][number];
//#endregion
//#region GM_VE
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
type GM_VE23462_WC={
	url: "/account"|"/account_notifications";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE37414_WC={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type GM_VE42352_WC={
	url: "/feed/downloads";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 42352;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE83769_WC={
	url: GM_VE83769_UrlType;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type GM_VE96368_WC_browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
//#endregion
//#region GM_ApiUrl
type GM_account_set_setting={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/set_setting";
};
type GM_AccountMenu={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};
type GM_backstage_create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type GM_browse_edit_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};
type GM_Browse={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
};
type GM_comment_create_comment={
	apiUrl: "/youtubei/v1/comment/create_comment";
	sendPost: true;
};
type GM_feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type GM_flag_get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type GM_get_survey={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_survey";
};
type GM_get_transcript={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_transcript";
};
type GM_GetNotificationMenu={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_notification_menu";
};
type GM_like_dislike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/dislike";
};
type GM_like_like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type GM_like_removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type GM_Next={
	sendPost: true;
	apiUrl: "/youtubei/v1/next";
};
type GM_notification_get_unseen_count={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_unseen_count";
};
type GM_notification_opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type GM_notification_record_interactions={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/record_interactions";
};
type GM_playlist_create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
type GM_playlist_get_add_to_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};
type GM_share_get_share_panel={
	sendPost: true;
	apiUrl: "/youtubei/v1/share/get_share_panel";
};
type GM_subscription_subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type GM_ypc_get_offers={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_offers";
};
type GM_YpcGetCart={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_cart";
};
type GM_SendPost={
	sendPost: true;
};
//#endregion
//#region M_*
type M_AccountMenu={webCommandMetadata: GM_AccountMenu;};
type M_Browse={webCommandMetadata: GM_Browse;};
type M_GetNotificationMenu={webCommandMetadata: GM_GetNotificationMenu;};
type M_YpcGetCart={webCommandMetadata: GM_YpcGetCart;};
type M_SendPost={webCommandMetadata: GM_SendPost;};
type M_VE3611={webCommandMetadata: GM_VE3611_WC;};
type M_VE3832={webCommandMetadata: GM_VE3832_Watch_WC;};
type M_VE3854={webCommandMetadata: GM_VE3854_WC;};
type M_VE4724={webCommandMetadata: GM_VE4724_WC;};
type M_VE5754={webCommandMetadata: GM_VE5754_WC;};
type M_VE6827={webCommandMetadata: GM_VE6827_WC;};
type M_VE11487={webCommandMetadata: GM_VE11487_WC;};
type M_VE23462={webCommandMetadata: GM_VE23462_WC;};
type M_VE37414={webCommandMetadata: GM_VE37414_WC;};
type M_VE42352={webCommandMetadata: GM_VE42352_WC;};
type M_VE83769={webCommandMetadata: GM_VE83769_WC;};
type M_VE96368={webCommandMetadata: GM_VE96368_WC_browse;};
//#endregion
//#region DE_VE\d+_.+
type DE_VE3611_Browse={
	browseId: `UC${string}`;
	canonicalBaseUrl: `/@${string}`;
};
type DE_VE3854_Browse={browseId: "FEwhat_to_watch";};
type DE_VE5754_Browse={
	browseId: `VL${"LL"|"WL"|`PL${string}`}`;
};
type DE_VE6827_UrlType=`FE${"trending"|"history"|"library"|"storefront"|"guide_builder"}`;
type DE_VE6827_Browse={
	browseId:
	|"FElibrary"
	|"FEhistory"
	|"FEguide_builder"
	|"SPreport_history"
	;
}|{
	browseId:
	|"FEtrending"
	|"FEstorefront"
	;
	params: string;
};
type DE_VE23462_Browse={
	browseId:
	|"SPaccount_notifications"
	|"SPaccount_overview"
	;
};
type DE_VE96368_Browse={browseId: "FEsubscriptions";};
type DE_VE42352_Browse={browseId: "FEdownloads";};
//#endregion
//#region E_VE\d+_.+
type E_VE3611_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE3611;
	browseEndpoint: DE_VE3611_Browse;
};
type E_VE3854_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE3854;
	browseEndpoint: DE_VE3854_Browse;
};
type E_VE5754_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE5754;
	browseEndpoint: DE_VE5754_Browse;
};
type E_VE6827_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE6827;
	browseEndpoint: DE_VE6827_Browse;
};
type E_VE23462_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE23462;
	browseEndpoint: DE_VE23462_Browse;
};

type E_VE96368_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE96368;
	browseEndpoint: DE_VE96368_Browse;
};
type E_VE42352_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE42352;
	browseEndpoint: DE_VE42352_Browse;
};
type DE_VE11487_Browse={
	browseId: "SPunlimited";
};
type E_VE11487_Browse={
	clickTrackingParams: string;
	commandMetadata: M_VE11487;
	browseEndpoint: DE_VE11487_Browse;
};

//#endregion
type E_Browse=[
	E_VE3611_Browse,
	E_VE3854_Browse,
	E_VE6827_Browse,
	E_VE5754_Browse,
	E_VE11487_Browse,
	E_VE23462_Browse,
	E_VE42352_Browse,
	E_VE96368_Browse,
][number];