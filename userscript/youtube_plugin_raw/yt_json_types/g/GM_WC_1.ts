type M_YpcGetCart={webCommandMetadata: GM_YpcGetCart;};
type GM_WC_1=[
	GM_VE11487_WC,
	GM_VE23462_WC,
	GM_VE3611_WC,
	GM_VE37414_WC,
	GM_VE3832_Watch_WC,
	GM_VE3854_WC,
	GM_VE4724_WC,
	GM_VE5754_WC,
	GM_VE6827_WC,
	GM_VE83769_WC,
	GM_VE96368_WC,
	GM_VE96368_WC_browse,
	GM_account_account_menu,
	GM_account_set_setting,
	GM_backstage_create_post,
	GM_browse,
	GM_browse_edit_playlist,
	GM_feedback,
	GM_flag_get_form,
	GM_get_transcript,
	GM_like_like,
	GM_like_removelike,
	GM_next,
	GM_notification_get_notification_menu,
	GM_notification_get_unseen_count,
	GM_notification_opt_out,
	GM_notification_record_interactions,
	GM_playlist_create,
	GM_playlist_get_add_to_playlist,
	GM_share_get_share_panel,
	GM_subscription_subscribe,
	GM_ypc_get_offers,
	GM_YpcGetCart,
][number];
type GM_VE3611_WC={
	url: `/@${string}`;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE3832_Watch_WC={
	url: `/watch?${string}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type GM_VE5754_WC={
	rootVe: 5754;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
};
type GM_VE23462_WC={
	url: "/account_notifications";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE4724_WC={
	url: "/results?search_query=";
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type GM_VE37414_WC={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type GM_VE96368_WC={
	rootVe: 96368;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type GM_VE11487_WC={
	rootVe: 11487;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type GM_VE6827_WC={
	rootVe: 6827;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type GM_VE3854_WC={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE83769_WC={
	url: "/upload";
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type GM_VE96368_WC_browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
type GM_ypc_get_offers={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_offers";
};
type GM_account_set_setting={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/set_setting";
};
type GM_playlist_get_add_to_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};
type GM_browse_edit_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};
type GM_share_get_share_panel={
	sendPost: true;
	apiUrl: "/youtubei/v1/share/get_share_panel";
};
type GM_next={
	sendPost: true;
	apiUrl: "/youtubei/v1/next";
};
type GM_get_transcript={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_transcript";
};
type GM_browse={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
};
type GM_account_account_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};
type GM_notification_get_unseen_count={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_unseen_count";
};
type GM_notification_get_notification_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_notification_menu";
};
type GM_backstage_create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type GM_like_removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type GM_like_like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type GM_feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type GM_subscription_subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type GM_notification_opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type GM_flag_get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type GM_playlist_create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
type GM_notification_record_interactions={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/record_interactions";
};
type GM_YpcGetCart={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_cart";
};
