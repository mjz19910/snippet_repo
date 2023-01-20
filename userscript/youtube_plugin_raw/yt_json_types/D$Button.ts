type D$Button={
	accessibility?: LabelData;
	accessibilityData?: Accessibility;
	command?: ButtonCommand;
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: E$Button_serviceEndpoint;
	navigationEndpoint?: E$Button_navigationEndpoint;
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextT;
	trackingParams?: string;
	hint?: R$Hint;
	targetId?: YtTargetIdType;
};