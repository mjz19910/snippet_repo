type ResponseContext={
	mainAppWebResponseContext: MainAppWebResponseContextData;
	serviceTrackingParams: AllServiceTrackingParams[];
	webResponseContextExtensionData: WebResponseContextExtensionData;
}|{
	serviceTrackingParams: AllServiceTrackingParams[];
	maxAgeSeconds: number;
	mainAppWebResponseContext: MainAppWebResponseContextData;
	webResponseContextExtensionData: WebResponseContextExtensionData;
};
