type PageTypeWatch={
	pageType: "watch";
	endpoint: E$WatchEndpoint;
	response: R_WatchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};