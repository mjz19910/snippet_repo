type G$WC$Metadata$1=[
	G$VE11487$WC$Metadata,
	G$VE23462$WC$Metadata,
	G$VE3611$WC$Metadata,
	G$VE37414$WC$Metadata,
	G$VE3832$WC$Metadata,
	G$VE3854$WC$Metadata,
	G$VE4724$WC$Metadata,
	G$VE5754$WC$Metadata,
	G$VE6827$WC$Metadata,
	G$VE83769$WC$Metadata,
	G$VE96368$WC$Metadata,
	G$VE96368$WC$Metadata$browse,
	G$WC$Metadata$account$account_menu,
	G$WC$Metadata$account$set_setting,
	G$WC$Metadata$backstage$create_post,
	G$WC$Metadata$browse,
	G$WC$Metadata$browse$edit_playlist,
	G$WC$Metadata$feedback,
	G$WC$Metadata$flag$get_form,
	G$WC$Metadata$get_transcript,
	G$WC$Metadata$like$like,
	G$WC$Metadata$like$removelike,
	G$WC$Metadata$next,
	G$WC$Metadata$notification$get_notification_menu,
	G$WC$Metadata$notification$get_unseen_count,
	G$WC$Metadata$notification$opt_out,
	G$WC$Metadata$notification$record_interactions,
	G$WC$Metadata$playlist$create,
	G$WC$Metadata$playlist$get_add_to_playlist,
	G$WC$Metadata$share$get_share_panel,
	G$WC$Metadata$subscription$subscribe,
	G$WC$Metadata$ypc$get_offers,
][number];
type G$VE3611$WC$Metadata={
	rootVe: 3611;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
};
type G$VE3832$WC$Metadata={
	rootVe: 3832;
	webPageType: "WEB_PAGE_TYPE_WATCH";
};
type G$VE5754$WC$Metadata={
	rootVe: 5754;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
};
type G$VE23462$WC$Metadata={
	rootVe: 23462;
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
};
type G$VE4724$WC$Metadata={
	url: "/results?search_query=";
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type G$VE37414$WC$Metadata={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type G$VE96368$WC$Metadata={
	rootVe: 96368;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type G$VE11487$WC$Metadata={
	rootVe: 11487;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type G$VE6827$WC$Metadata={
	rootVe: 6827;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type G$VE3854$WC$Metadata={
	rootVe: 3854;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type G$VE83769$WC$Metadata={
	url: "/upload";
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type G$VE96368$WC$Metadata$browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
type G$WC$Metadata$ypc$get_offers={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_offers";
};
type G$WC$Metadata$account$set_setting={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/set_setting";
};
type G$WC$Metadata$playlist$get_add_to_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};
type G$WC$Metadata$browse$edit_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};
type G$WC$Metadata$share$get_share_panel={
	sendPost: true;
	apiUrl: "/youtubei/v1/share/get_share_panel";
};
type G$WC$Metadata$next={
	sendPost: true;
	apiUrl: "/youtubei/v1/next";
};
type G$WC$Metadata$get_transcript={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_transcript";
};
type G$WC$Metadata$browse={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
};
type G$WC$Metadata$account$account_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};
type G$WC$Metadata$notification$get_unseen_count={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_unseen_count";
};
type G$WC$Metadata$notification$get_notification_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_notification_menu";
};
type G$WC$Metadata$backstage$create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type G$WC$Metadata$like$removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type G$WC$Metadata$like$like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type G$WC$Metadata$feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type G$WC$Metadata$subscription$subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type G$WC$Metadata$notification$opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type G$WC$Metadata$flag$get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type G$WC$Metadata$playlist$create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
type G$WC$Metadata$notification$record_interactions={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/record_interactions";
};
