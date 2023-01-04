type ButtonRendererData={
	accessibility: Accessibility;
	command: YtEndpoint;
	icon: Icon<"SETTINGS">;
	isDisabled: boolean;
	serviceEndpoint: YtEndpoint;
	size: "SIZE_DEFAULT";
	style: ButtonStyleType;
	text: TextT;
	trackingParams: string;
}|{
	style: ButtonStyleType;
	text: TextT;
	icon: Icon<string>;
	command: YtEndpoint;
}|{
	style: ButtonStyleType;
	size: "SIZE_DEFAULT";
	text: TextT;
	serviceEndpoint: YtEndpoint;
	accessibility: Accessibility;
	trackingParams: string;
};