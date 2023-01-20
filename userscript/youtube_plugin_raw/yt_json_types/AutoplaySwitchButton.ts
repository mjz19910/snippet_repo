type AutoplaySwitchButton={
	onEnabledCommand: E$SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: E$SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: Accessibility;
	disabledAccessibilityData: Accessibility;
	trackingParams: string;
	enabled: boolean;
};
