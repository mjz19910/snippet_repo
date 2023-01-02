type NavigateEventDetail={
	pageType: "browse";
	endpoint: YtEndpoint;
	response: YtBrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}|{
	pageType: "watch";
	endpoint: YtEndpoint;
	response: YtWatchPageResponse;
};
type YtWatchPageResponse={
	page: "watch";
	endpoint: YtEndpoint;
	response: WatchResponseContent;
	playerResponse: PlayerResponse;
	url: YtUrlFormat;
};
type PlayerResponse={};
type YtUrlPageOpt="watch";
type YtMyMixPlaylistFormat=`MM${string}`;
type YtInfinitePlaylistFormat=`RD${YtMyMixPlaylistFormat}`;
type YtUrlFormat=`/${YtUrlPageOpt}?v=${string}&list=${YtInfinitePlaylistFormat}`;
