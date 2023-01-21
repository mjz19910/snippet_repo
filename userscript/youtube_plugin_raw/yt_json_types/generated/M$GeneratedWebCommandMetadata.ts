type M$GeneratedWebCommandMetadata=[
	M_$SendPost,
	M$GeneratedWebCommandMetadata$1,
	G$get_transcript,
	G$next,
	G$share$get_share_panel,
	G$browse$edit_playlist,
	G$playlist$get_add_to_playlist,
	G$account$set_setting,
][number];
type G$account$set_setting={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/set_setting";
};
type G$playlist$get_add_to_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};
type G$browse$edit_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};
type G$share$get_share_panel={
	sendPost: true;
	apiUrl: "/youtubei/v1/share/get_share_panel";
};
type G$next={
	sendPost: true;
	apiUrl: "/youtubei/v1/next";
};
type G$get_transcript={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_transcript";
};