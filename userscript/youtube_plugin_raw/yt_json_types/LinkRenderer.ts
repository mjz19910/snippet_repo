type CompactLinkData={
	icon: Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: TextWithRuns;
	navigationEndpoint: UploadEndpoint;
	trackingParams: string;
	style: CompactLinkStyle|"COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
};
type UploadEndpointData={
	hack: true;
};

type UploadEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	uploadEndpoint: UploadEndpointData;
};