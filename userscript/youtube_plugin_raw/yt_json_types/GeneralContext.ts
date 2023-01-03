type BaseResponseContext={
	mainAppWebResponseContext: MainAppWebResponseContextData;
	serviceTrackingParams: AllServiceTrackingParams[];
	webResponseContextExtensionData: WebResponseContextExtensionData;
};

type RelevantStateTags={
	relevantStateTags: StateTag[];
};

type ResponseContext=BaseResponseContext|BaseResponseContext&({
	maxAgeSeconds: number;
}|{
	stateTags: RelevantStateTags;
});
