type GeneratedWebCommandMetadata=[
	_gen_playlist$create,
	_gen_notification$record_interactions,
	_gen_notification$opt_out,
	_gen_flag$get_form,
][number];
type _gen_notification$opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type _gen_flag$get_form={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};