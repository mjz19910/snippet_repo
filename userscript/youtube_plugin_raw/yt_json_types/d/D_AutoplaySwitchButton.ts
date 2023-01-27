type D_AutoplaySwitchButton={
	onEnabledCommand: T_E_SetSetting<true>;
	onDisabledCommand: T_E_SetSetting<false>;
	enabledAccessibilityData: D_Accessibility;
	disabledAccessibilityData: D_Accessibility;
	trackingParams: string;
	enabled: boolean;
};