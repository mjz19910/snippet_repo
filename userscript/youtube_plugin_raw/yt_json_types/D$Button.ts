type D$Button={
	accessibility?: A$LabelData;
	accessibilityData?: A$Accessibility;
	command?: ButtonCommand;
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: E$Button_serviceEndpoint;
	navigationEndpoint?: E$Button_navigationEndpoint;
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: D$TextT;
	trackingParams?: string;
	hint?: R$Hint;
	targetId?: D$Button$TargetId;
};