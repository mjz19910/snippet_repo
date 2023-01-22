type PageTypeWatch={
	pageType: "watch";
	endpoint: E_WatchEndpoint;
	response: R_WatchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};