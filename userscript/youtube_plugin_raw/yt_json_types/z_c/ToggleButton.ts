type D_ToggleButton={
	style: StyleTypeObj;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T_Icon<"LOOP">;
	defaultServiceEndpoint: C_RepeatChapter;
	toggledServiceEndpoint: C_Executor;
	trackingParams: string;
	toggledStyle: StyleTypeObj;
	accessibilityData: D_Accessibility;
	toggledAccessibilityData: D_Accessibility;
};