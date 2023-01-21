type ToggleButton={
	style: StyleTypeObj;
	isToggled: false;
	isDisabled: false;
	defaultIcon: Icon<"LOOP">;
	defaultServiceEndpoint: RepeatChapterCommand;
	toggledServiceEndpoint: CommandExecutorCommand;
	trackingParams: string;
	toggledStyle: StyleTypeObj;
	accessibilityData: A$Accessibility;
	toggledAccessibilityData: A$Accessibility;
};
