type D__AutoplaySwitchButton={
	onEnabledCommand: E_SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: E_SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: D__Accessibility;
	disabledAccessibilityData: D__Accessibility;
	trackingParams: string;
	enabled: boolean;
};