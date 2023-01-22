type D_ToggleButton={
	style: StyleTypeObj;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T_Icon<"LOOP">;
	defaultServiceEndpoint: RepeatChapterCommand;
	toggledServiceEndpoint: E_CommandExecutorCommand;
	trackingParams: string;
	toggledStyle: StyleTypeObj;
	accessibilityData: D_Accessibility;
	toggledAccessibilityData: D_Accessibility;
};