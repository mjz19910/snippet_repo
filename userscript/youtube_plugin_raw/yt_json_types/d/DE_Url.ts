type DE_Url={
	url: `https://www.youtube.com/redirect?${string}`;
	target: "TARGET_NEW_WINDOW";
	nofollow: true;
}|{
	url: GU_VE83769_ExternalUrlStr;
	target: "TARGET_NEW_WINDOW";
};
type D_YoutubeUrl=Extract<DE_Url['url'],`${string}www.youtube.com${string}`>;
type D_YoutubeKidsUrl=Extract<DE_Url['url']|"https://www.youtubekids.com/?source=youtube_web",`https://www.youtubekids.com${string}`>;