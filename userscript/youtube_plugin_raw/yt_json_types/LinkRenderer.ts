type CompactLinkData={
	icon: Icon<"PERSON_ADD"|"CREATION_UPLOAD">;
	title: TextWithRuns;
	navigationEndpoint: UploadEndpoint|SignalNavigationEndpoint;
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
type SignalNavigationEndpoint={
	clickTrackingParams: string;
	commandMetadata: SignalCommandMetadata;
	signalNavigationEndpoint: Signal_ChannelSwitcher;
};
type SignalCommandMetadata={
	webCommandMetadata: VE83769_WebCommandMetadata;
};