type D_Button={
	accessibility?: D__Label;
	accessibilityData?: D__Accessibility;
	command?: G_Button$command;
	icon?: D$ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: E_Button_serviceEndpoint<{}>;
	navigationEndpoint?: E_Button_navigationEndpoint;
	tooltip?: string;
	size?: D$ButtonSizeType;
	style?: D$ButtonStyleType;
	text?: G_Text;
	trackingParams?: string;
	hint?: R_Hint;
	targetId?: D__Button$TargetId;
};