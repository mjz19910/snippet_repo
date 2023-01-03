type SettingsResponseContent={
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	sidebar: SettingsSidebarRenderer;
}|{
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedEndpoints: YtEndpoint[];
	sidebar: SettingsSidebarRenderer;
};
