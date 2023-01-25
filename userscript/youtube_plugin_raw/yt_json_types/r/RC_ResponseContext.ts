type RC_ResponseContext={
	mainAppWebResponseContext?: RC_MainAppWebResponseContext;
	serviceTrackingParams: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData?: RC_WR_ContextExtension;
	consistencyTokenJar?: RC_ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RCA_RelevantStateTags;
};