type RC$ResponseContext={
	mainAppWebResponseContext?: RC$MainAppWebResponseContext;
	serviceTrackingParams: RC$AllServiceTrackingParams[];
	webResponseContextExtensionData?: RC$WebResponseContextExtension;
	consistencyTokenJar?: RC$ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RC$A_RelevantStateTags;
};