type YtBrowsePageResponse={
	page: "browse";
	endpoint: YtEndpoint;
	response: BrowseResponseContent;
	url: YtUrlFormat;
}|{
	page: "browse";
	endpoint: YtEndpoint;
	response: BrowseResponseContent;
	url: YtUrlFormat;
	previousCsn: string;
};
