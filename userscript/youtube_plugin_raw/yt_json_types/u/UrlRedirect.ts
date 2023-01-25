type DE_Url={
	url: `https://www.youtube.com/redirect?${string}`;
	target: "TARGET_NEW_WINDOW";
	nofollow: true;
}|{
	url:
	|`https://studio.youtube.com/channel/UC${string}/videos`
	|"https://studio.youtube.com"
	|"https://music.youtube.com"
	;
	target: "TARGET_NEW_WINDOW";
};