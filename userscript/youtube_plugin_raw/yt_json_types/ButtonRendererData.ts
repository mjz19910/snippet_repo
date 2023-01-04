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
	isDisabled: boolean;
	text: TextT;
	icon: Icon<string>;
	command: YtEndpoint;
};