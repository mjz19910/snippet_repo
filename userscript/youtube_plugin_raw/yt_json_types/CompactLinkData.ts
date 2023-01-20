type CompactLink_Endpoint=UploadEndpoint|SignalNavigationEndpoint;

type CompactLinkData={
	icon: Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: TextT;
	navigationEndpoint?: CompactLink_Endpoint;
	trackingParams: string;
	style?: CompactLinkStyle;
};
