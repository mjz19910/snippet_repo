type D$ToggleButton={
	style: StyleTypeObj;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T$Icon<"LOOP">;
	defaultServiceEndpoint: RepeatChapterCommand;
	toggledServiceEndpoint: E$CommandExecutorCommand;
	trackingParams: string;
	toggledStyle: StyleTypeObj;
	accessibilityData: AD$Accessibility;
	toggledAccessibilityData: AD$Accessibility;
};