type ButtonRendererData={
	accessibilityData: Accessibility;
	command: YtEndpoint;
	icon: Icon<"SETTINGS">;
	isDisabled: boolean;
	navigationEndpoint: YtEndpoint;
	serviceEndpoint: YtEndpoint;
	size: "SIZE_DEFAULT";
	style: ButtonStyleType;
	text: TextT;
	tooltip: string;
	trackingParams: string;
}|{
	style: ButtonStyleType;
	isDisabled: boolean;
	text: TextT;
	icon: Icon<string>;
	command: YtEndpoint;
};