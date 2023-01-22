type PageTypeWatch={
	pageType: "watch";
	endpoint: E$WatchEndpoint;
	response: R$WatchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};