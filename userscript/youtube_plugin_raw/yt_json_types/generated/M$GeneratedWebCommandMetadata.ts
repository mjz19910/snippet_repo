type M$GeneratedWebCommandMetadata=[
	_gen_backstage$create_post,
	_gen_browse,
	_gen_feedback,
	_gen_flag$get_form,
	_gen_like$like,
	_gen_like$removelike,
	_gen_notification$opt_out,
	_gen_notification$record_interactions,
	_gen_playlist$create,
	_gen_subscription$subscribe,
	_gen_VE11487,
	_gen_VE3854,
	_gen_VE6827,
	_gen_VE83769,
	_gen_VE96368,
][number];
type _gen_VE96368={
	rootVe: 96368;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type _gen_VE11487={
	rootVe: 11487;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type _gen_VE6827={
	rootVe: 6827;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};

type _gen_VE3854={
	rootVe: 3854;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
};
type _gen_VE83769={
	url: "/upload";
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type _gen_browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
type _gen_backstage$create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type _gen_like$removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type _gen_like$like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type _gen_feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type _gen_subscription$subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type _gen_notification$opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type _gen_flag$get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type _gen_playlist$create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
