type AutoplaySwitchButton={
	onEnabledCommand: SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: AccessibilityData;
	disabledAccessibilityData: AccessibilityData;
	trackingParams: string;
	enabled: boolean;
};
