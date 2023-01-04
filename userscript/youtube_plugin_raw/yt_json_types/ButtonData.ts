type ButtonData={
	accessibility?: Accessibility;
	command?: YtEndpoint;
	icon: Icon<"SETTINGS">|Icon<string>;
	isDisabled: boolean;
	serviceEndpoint?: YtEndpoint;
	size: "SIZE_DEFAULT";
	style: ButtonStyleType;
	text: TextT;
	trackingParams?: string;
};