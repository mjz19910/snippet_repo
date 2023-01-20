type M$GeneratedWebCommandMetadata=[
	_gen_playlist$create,
	_gen_notification$record_interactions,
	_gen_notification$opt_out,
	_gen_flag$get_form,
	_gen_subscription$subscribe,
	_gen_feedback,
	_gen_like$like,
	_gen_like$removelike
][number];
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
