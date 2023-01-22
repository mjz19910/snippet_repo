type RC$ResponseContext={
	mainAppWebResponseContext?: RC$MainAppWebResponseContext;
	serviceTrackingParams: RC$AllServiceTrackingParams[];
	webResponseContextExtensionData?: RC$WebResponseContextExtensionData;
	consistencyTokenJar?: RC$ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RC$A$RelevantStateTags;
};