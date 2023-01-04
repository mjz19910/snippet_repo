type ButtonData={
	accessibility?: Accessibility;
	command?: YtEndpoint;
	icon: Icon<"SETTINGS">|Icon<"DELETE">;
	isDisabled?: boolean;
	serviceEndpoint?: YtEndpoint;
	navigationEndpoint?: YtEndpoint;
	size?: "SIZE_DEFAULT";
	style?: ButtonStyleType;
	text: TextT;
	trackingParams?: string;
};