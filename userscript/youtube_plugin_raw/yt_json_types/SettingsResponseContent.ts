type SettingsResponse={
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedEndpoints?: {}[];
	sidebar: SettingsSidebarRenderer;
};
