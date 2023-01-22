type D$AutoplaySwitchButton={
	onEnabledCommand: E$SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: E$SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: AD$Accessibility;
	disabledAccessibilityData: AD$Accessibility;
	trackingParams: string;
	enabled: boolean;
};