type D_ToggleButton={
	style: T_StyleType<{}>;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T_Icon<"LOOP">;
	defaultServiceEndpoint: C_RepeatChapter;
	toggledServiceEndpoint: C_Executor;
	trackingParams: string;
	toggledStyle: T_StyleType<{}>;
	accessibilityData: D_Accessibility;
	toggledAccessibilityData: D_Accessibility;
};