type DE_Url={
	url: `https://www.youtube.com/redirect?${string}`;
	target: "TARGET_NEW_WINDOW";
	nofollow: true;
}|{
	url:
	|`https://studio.youtube.com/channel/UC${string}/videos`
	|"https://studio.youtube.com"
	|"https://music.youtube.com"
	|"https://www.youtubekids.com?source=youtube_web"
	;
	target: "TARGET_NEW_WINDOW";
};