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
	text?: TextT;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};
type ShareEntityServiceArgs={
	serializedShareEntity: string;
	commands: OpenPopupAction[];
};

type ShareEntityServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	shareEntityServiceEndpoint: ShareEntityServiceArgs;
};