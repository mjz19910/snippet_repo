type D_AutoplaySwitchButton={
	onEnabledCommand: E_SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: E_SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: D_Accessibility;
	disabledAccessibilityData: D_Accessibility;
	trackingParams: string;
	enabled: boolean;
};