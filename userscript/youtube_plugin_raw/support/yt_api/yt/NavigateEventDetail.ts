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
};