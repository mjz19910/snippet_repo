type G_WC$Metadata$1=[
	G_VE11487$WC$Metadata,
	G_VE23462$WC$Metadata,
	G_VE3611$WC$Metadata,
	G_VE37414$WC$Metadata,
	G_VE3832$Watch$WC$Metadata,
	G_VE3854$WC$Metadata,
	G_VE4724$WC$Metadata,
	G_VE5754$WC$Metadata,
	G_VE6827$WC$Metadata,
	G_VE83769$WC$Metadata,
	G_VE96368$WC$Metadata,
	G_VE96368$WC$Metadata$browse,
	G_WC$Metadata$account$account_menu,
	G_WC$Metadata$account$set_setting,
	G_WC$Metadata$backstage$create_post,
	G_WC$Metadata$browse,
	G_WC$Metadata$browse$edit_playlist,
	G_WC$Metadata$feedback,
	G_WC$Metadata$flag$get_form,
	G_WC$Metadata$get_transcript,
	G_WC$Metadata$like$like,
	G_WC$Metadata$like$removelike,
	G_WC$Metadata$next,
	G_WC$Metadata$notification$get_notification_menu,
	G_WC$Metadata$notification$get_unseen_count,
	G_WC$Metadata$notification$opt_out,
	G_WC$Metadata$notification$record_interactions,
	G_WC$Metadata$playlist$create,
	G_WC$Metadata$playlist$get_add_to_playlist,
	G_WC$Metadata$share$get_share_panel,
	G_WC$Metadata$subscription$subscribe,
	G_WC$Metadata$ypc$get_offers,
][number];
type G_VE3611$WC$Metadata={
	rootVe: 3611;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
};
type G_VE3832$Watch$WC$Metadata={
	url: `/watch?${string}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type G_VE5754$WC$Metadata={
	rootVe: 5754;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
};
type G_VE23462$WC$Metadata={
	rootVe: 23462;
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
};
type G_VE4724$WC$Metadata={
	url: "/results?search_query=";
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type G_VE37414$WC$Metadata={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type G_VE96368$WC$Metadata={
	rootVe: 96368;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type G_VE11487$WC$Metadata={
	rootVe: 11487;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type G_VE6827$WC$Metadata={
	rootVe: 6827;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type G_VE3854$WC$Metadata={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
type G_VE83769$WC$Metadata={
	url: "/upload";
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type G_VE96368$WC$Metadata$browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
type G_WC$Metadata$ypc$get_offers={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_offers";
};
type G_WC$Metadata$account$set_setting={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/set_setting";
};
type G_WC$Metadata$playlist$get_add_to_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};
type G_WC$Metadata$browse$edit_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};
type G_WC$Metadata$share$get_share_panel={
	sendPost: true;
	apiUrl: "/youtubei/v1/share/get_share_panel";
};
type G_WC$Metadata$next={
	sendPost: true;
	apiUrl: "/youtubei/v1/next";
};
type G_WC$Metadata$get_transcript={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_transcript";
};
type G_WC$Metadata$browse={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
};
type G_WC$Metadata$account$account_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};
type G_WC$Metadata$notification$get_unseen_count={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_unseen_count";
};
type G_WC$Metadata$notification$get_notification_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_notification_menu";
};
type G_WC$Metadata$backstage$create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type G_WC$Metadata$like$removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type G_WC$Metadata$like$like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type G_WC$Metadata$feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type G_WC$Metadata$subscription$subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type G_WC$Metadata$notification$opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type G_WC$Metadata$flag$get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type G_WC$Metadata$playlist$create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
type G_WC$Metadata$notification$record_interactions={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/record_interactions";
};