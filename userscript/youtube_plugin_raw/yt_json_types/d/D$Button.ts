type D_Button={
	accessibility?: D_Label;
	accessibilityData?: D_Accessibility;
	command?: GC_Button;
	icon?: D$ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: ES_Button;
	navigationEndpoint?: E_Button_navigation;
	tooltip?: string;
	size?: D$ButtonSizeType;
	style?: D$ButtonStyleType;
	text?: G_Text;
	trackingParams?: string;
	hint?: R_Hint;
	targetId?: D_Button$TargetId;
};