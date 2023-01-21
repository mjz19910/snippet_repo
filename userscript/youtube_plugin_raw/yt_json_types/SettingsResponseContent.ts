type SettingsResponse={
	responseContext: RC$ResponseContext;
	contents: R$TwoColumnBrowseResults;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	onResponseReceivedEndpoints?: {}[];
	sidebar: SettingsSidebarRenderer;
};
