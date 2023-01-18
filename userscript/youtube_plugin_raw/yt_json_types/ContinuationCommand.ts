type SearchApiWebCommandMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/search";
};

type ContinuationWebCommandMetadata=SearchApiWebCommandMetadata|VE3832_WebCommandMetadata;

type ContinuationCommandMetadata={
	webCommandMetadata: ContinuationWebCommandMetadata;
};

type ContinuationCommand={
	clickTrackingParams: string;
	commandMetadata: ContinuationCommandMetadata;
	continuationCommand: ContinuationCommandData;
};