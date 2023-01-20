type TabData={
	selected: true;
	content: RichGridRenderer;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
}|{
	selected: true;
	content: SectionListRenderer;
	trackingParams: string;
}|{
	endpoint: E$BrowseEndpoint;
	title: string;
	selected?: true;
	content?: SectionListRenderer;
	trackingParams: string;
}|{
	endpoint: E$BrowseEndpoint;
	selected: true;
	content: SectionListRenderer;
	tabIdentifier: "FEsubscriptions";
	accessibility: Accessibility;
	trackingParams: string;
};