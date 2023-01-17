type ResponseContext={
	mainAppWebResponseContext?: MainAppWebResponseContext;
	serviceTrackingParams: AllServiceTrackingParams[];
	webResponseContextExtensionData?: WebResponseContextExtensionData;
	consistencyTokenJar?: ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RelevantStateTags;
};