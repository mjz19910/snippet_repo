type D$Button={
	accessibility?: A$Label;
	accessibilityData?: A$Accessibility;
	command?: G$Button$command;
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: E$Button_serviceEndpoint<{}>;
	navigationEndpoint?: E$Button_navigationEndpoint;
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: G$Text;
	trackingParams?: string;
	hint?: R$Hint;
	targetId?: D$Button$TargetId;
};