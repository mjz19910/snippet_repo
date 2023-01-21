type E$CompactLink$navigationEndpoint=E$UploadEndpoint|E$SignalNavigationEndpoint;

type D$CompactLink={
	icon: Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: D$TextT;
	navigationEndpoint?: E$CompactLink$navigationEndpoint;
	trackingParams: string;
	style?: CompactLinkStyle;
};
