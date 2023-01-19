type SignalNavigationArgs=Signal_ChannelSwitcher|{
	signal: "LIVE_CONTROL_ROOM";
};

type SignalNavigationEndpoint={
	clickTrackingParams: string;
	commandMetadata: SignalCommandMetadata;
	signalNavigationEndpoint: SignalNavigationArgs;
};
