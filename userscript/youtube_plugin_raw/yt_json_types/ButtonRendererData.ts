type ButtonRendererData={
	accessibilityData: Accessibility;
	command: YtEndpoint;
	icon: Icon<"SETTINGS">;
	isDisabled: boolean;
	navigationEndpoint: YtEndpoint;
	serviceEndpoint: YtEndpoint;
	size: "SIZE_DEFAULT";
	style: "STYLE_DEFAULT"|"STYLE_SUGGESTIVE";
	text: TextT;
	tooltip: string;
	trackingParams: string;
	clickTrackingParams?: string;
}|{
	style: "STYLE_DEFAULT"|"STYLE_SUGGESTIVE";
	isDisabled: boolean;
	text: TextT;
	icon: Icon<string>;
	command: YtEndpoint;
};