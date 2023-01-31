//#region Extract on Url
type D_EX_YoutubeUrl=Extract<DU_DE_Url['url'],`${string}www.youtube.com${string}`>;
type D_EX_YoutubeKidsUrl=Extract<DU_DE_Url['url']|"https://www.youtubekids.com/?source=youtube_web",`https://www.youtubekids.com${string}`>;
//#endregion
