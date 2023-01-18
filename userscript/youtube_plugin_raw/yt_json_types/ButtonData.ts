type ButtonData={
	accessibility?: AccessibilityData;
	accessibilityData?: Accessibility;
	command?: ButtonCommand;
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: SignalServiceEndpoint;
	navigationEndpoint?: ShareEntityServiceEndpoint;
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextWithRuns;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};
type ShareEntityServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	shareEntityServiceEndpoint: {
		serializedShareEntity: string;
		commands: OpenPopupAction[];
	};
};