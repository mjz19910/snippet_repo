type CompactLinkData={
	icon: Icon<"PERSON_ADD">;
	title: TextWithRuns;
	navigationEndpoint: UploadEndpoint;
	trackingParams: string;
	style: CompactLinkStyle;
};
type UploadEndpointData={
	hack: true;
};

type UploadEndpoint={
	clickTrackingParams: string;
	commandMetadata: WebCommandMetadata;
	uploadEndpoint: UploadEndpointData;
};