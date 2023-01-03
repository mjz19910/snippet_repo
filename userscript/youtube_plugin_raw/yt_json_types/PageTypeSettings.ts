type YtSettingsResponse={
	page: "settings";
	endpoint: YtEndpoint;
};

type PageTypeSettings={
	pageType: "settings";
	endpoint: YtEndpoint;
	response: YtSettingsResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
