type D_AutoplaySwitchButton={
	onEnabledCommand: T_Setting_AutoNavForDesktop<true>;
	onDisabledCommand: T_Setting_AutoNavForDesktop<false>;
	enabledAccessibilityData: D_Accessibility;
	disabledAccessibilityData: D_Accessibility;
	trackingParams: string;
	enabled: boolean;
};