type SettingItemAutonavForDesktop<T extends boolean>={
	settingItemId: "407";
	boolValue: T;
	settingItemIdForClient: "AUTONAV_FOR_DESKTOP";
};

type SetSettingCommandMetadata={
	webCommandMetadata: {
		sendPost: true;
		apiUrl: "/youtubei/v1/account/set_setting";
	};
};

type SetSettingEndpointAutonavForDesktop<T extends boolean>={
	clickTrackingParams: string;
	commandMetadata: SetSettingCommandMetadata;
	setSettingEndpoint: SettingItemAutonavForDesktop<T>;
}
type SetSettingEndpoint=SetSettingEndpointAutonavForDesktop<boolean>;
type AutoplaySwitchButton={
	onEnabledCommand: SetSettingEndpointAutonavForDesktop<true>;
	onDisabledCommand: SetSettingEndpointAutonavForDesktop<false>;
	enabledAccessibilityData: Accessibility;
	disabledAccessibilityData: Accessibility;
	trackingParams: string;
	enabled: boolean;
};

type AutoplaySwitchButtonRenderer={
	autoplaySwitchButtonRenderer: AutoplaySwitchButton;
};

type PlayerOverlay={
	endScreen: WatchNextEndScreenRenderer;
	shareButton: ButtonRenderer;
	addToMenu: MenuRenderer;
	videoDetails: PlayerOverlayVideoDetailsRenderer;
	autonavToggle: AutoplaySwitchButtonRenderer;
	decoratedPlayerBarRenderer: DecoratedPlayerBarRenderer;
};