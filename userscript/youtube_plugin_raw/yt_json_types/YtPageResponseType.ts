type YtBrowsePageResponse={
	page: "browse";
	endpoint: YtEndpoint;
	response: BrowseResponseContent;
	url: string;
}|{
	page: "browse";
	endpoint: YtEndpoint;
	response: BrowseResponseContent;
	url: string;
	previousCsn: string;
};
