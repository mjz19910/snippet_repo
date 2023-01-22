type D$AutoplaySwitchButton={
	onEnabledCommand: E$SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: E$SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: D$Accessibility;
	disabledAccessibilityData: D$Accessibility;
	trackingParams: string;
	enabled: boolean;
};