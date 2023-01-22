type E$CompactLink$navigationEndpoint=E$UploadEndpoint|E$SignalNavigation;

type D$CompactLink={
	icon: T$Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: G$Text;
	navigationEndpoint?: E$CompactLink$navigationEndpoint;
	trackingParams: string;
	style?: CompactLinkStyle;
};