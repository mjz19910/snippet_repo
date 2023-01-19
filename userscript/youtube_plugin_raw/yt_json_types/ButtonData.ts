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
	hint?: HintRenderer;
	targetId?: YtTargetIdType;
};