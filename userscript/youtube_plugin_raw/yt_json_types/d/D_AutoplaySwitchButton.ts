type D_AutoplaySwitchButton={
	onEnabledCommand: E_SetSettingAutonavForDesktop<true>;
	onDisabledCommand: E_SetSettingAutonavForDesktop<false>;
	enabledAccessibilityData: D_Accessibility;
	disabledAccessibilityData: D_Accessibility;
	trackingParams: string;
	enabled: boolean;
};