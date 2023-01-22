type ResponseMaxAge={
	mainAppWebResponseContext: RC$MainAppWebResponseContext;
	serviceTrackingParams: RC$AllServiceTrackingParams[];
	webResponseContextExtensionData: RC_WebResponseContextExtension;
	maxAgeSeconds: number;
};