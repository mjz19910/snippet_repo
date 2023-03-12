type D_InstreamVideoAd={
	skipOffsetMilliseconds: number;
	pings: D_Pings;
	clickthroughEndpoint: E_Url;
	csiParameters: D_CsiParameterItem[];
	playerVars: string;
	playerOverlay: R_InstreamAdPlayerOverlay;
	elementId: string;
	trackingParams: string;
	legacyInfoCardVastExtension: string;
	sodarExtensionData: D_SodarExtensionData;
	externalVideoId: string;
	adLayoutLoggingData: D_SerializedAdServingDataEntry;
	layoutId: string;
};
