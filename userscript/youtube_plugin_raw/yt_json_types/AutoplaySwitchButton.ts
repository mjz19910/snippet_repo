type AutoplaySwitchButton={
	onEnabledCommand: SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: Accessibility;
	disabledAccessibilityData: Accessibility;
	trackingParams: string;
	enabled: boolean;
};
