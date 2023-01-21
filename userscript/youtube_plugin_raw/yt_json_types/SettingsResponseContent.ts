type SettingsResponse={
	responseContext: ResponseContext;
	contents: R$TwoColumnBrowseResults;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedEndpoints?: {}[];
	sidebar: SettingsSidebarRenderer;
};
