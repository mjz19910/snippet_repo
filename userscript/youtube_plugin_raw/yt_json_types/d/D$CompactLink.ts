type E$CompactLink$navigationEndpoint=E$UploadEndpoint|E$SignalNavigation;

type D__CompactLink={
	icon: T$Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: G$Text;
	navigationEndpoint?: E$CompactLink$navigationEndpoint;
	trackingParams: string;
	style?: CompactLinkStyle;
};