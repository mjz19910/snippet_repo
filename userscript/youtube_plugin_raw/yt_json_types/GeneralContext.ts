type ResponseContext={
	mainAppWebResponseContext: MainAppWebResponseContextData;
	serviceTrackingParams: AllServiceTrackingParams[];
	webResponseContextExtensionData: WebResponseContextExtensionData;
	consistencyTokenJar?: ConsistencyTokenJarData;
	maxAgeSeconds?: number;
	stateTags?: RelevantStateTags;
};