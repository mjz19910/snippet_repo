type AutoplaySwitchButton={
	onEnabledCommand: E$SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: E$SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: A$Accessibility;
	disabledAccessibilityData: A$Accessibility;
	trackingParams: string;
	enabled: boolean;
};
