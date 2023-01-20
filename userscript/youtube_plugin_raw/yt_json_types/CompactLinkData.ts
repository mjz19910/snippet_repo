type E$CompactLink$navigationEndpoint=E$UploadEndpoint|E$SignalNavigationEndpoint;

type CompactLinkData={
	icon: Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: TextT;
	navigationEndpoint?: E$CompactLink$navigationEndpoint;
	trackingParams: string;
	style?: CompactLinkStyle;
};
