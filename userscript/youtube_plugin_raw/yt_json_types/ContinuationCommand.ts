type ContinuationWebCommandMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/search";
};

type ContinuationCommandMetadata=CommandMetadataTemplate<3832>|{
	webCommandMetadata: ContinuationWebCommandMetadata;
};

type ContinuationCommand={
	clickTrackingParams: string;
	commandMetadata: ContinuationCommandMetadata;
	continuationCommand: ContinuationCommandData;
};