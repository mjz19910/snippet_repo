type SettingsResponse={
	responseContext: RC$ResponseContext;
	contents: R$TwoColumnBrowseResults;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedEndpoints?: {}[];
	sidebar: SettingsSidebarRenderer;
};
