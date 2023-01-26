type DE_Url={
	url: `https://www.youtube.com/redirect?${string}`;
	target: "TARGET_NEW_WINDOW";
	nofollow: true;
}|{
	url: DE_Url_UrlType;
	target: "TARGET_NEW_WINDOW";
};