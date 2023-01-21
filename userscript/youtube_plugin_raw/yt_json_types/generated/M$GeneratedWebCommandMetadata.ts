type M$GeneratedWebCommandMetadata=[
	G$account$account_menu,
	G$backstage$create_post,
	G$browse,
	G$feedback,
	G$flag$get_form,
	G$like$like,
	G$like$removelike,
	G$notification$get_notification_menu,
	G$notification$get_unseen_count,
	G$notification$opt_out,
	G$notification$record_interactions,
	G$playlist$create,
	G$subscription$subscribe,
	G$VE11487,
	G$VE23462,
	G$VE3611,
	G$VE37414,
	G$VE3832,
	G$VE3854,
	G$VE4724,
	G$VE5754,
	G$VE6827,
	G$VE83769,
	G$VE96368,
	G$VE96368$browse,
][number];
type G$VE3611={
	rootVe: 3611;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
};
type G$VE3832={
	rootVe: 3832;
	webPageType: "WEB_PAGE_TYPE_WATCH";
};
type G$VE5754={
	rootVe: 5754;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
};
type G$VE23462={
	rootVe: 23462;
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
};
type G$VE4724={
	url: "/results?search_query=";
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type G$VE37414={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type G$VE96368={
	rootVe: 96368;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type G$VE11487={
	rootVe: 11487;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type G$VE6827={
	rootVe: 6827;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type G$VE3854={
	rootVe: 3854;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type G$VE83769={
	url: "/upload";
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type G$VE96368$browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
type G$browse={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
};
type G$account$account_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};
type G$notification$get_unseen_count={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_unseen_count";
};
type G$notification$get_notification_menu={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_notification_menu";
};
type G$backstage$create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type G$like$removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type G$like$like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type G$feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type G$subscription$subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type G$notification$opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type G$flag$get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type G$playlist$create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
type G$notification$record_interactions={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/record_interactions";
};
