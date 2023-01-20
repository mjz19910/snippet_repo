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
	endpoint: E_BrowseEndpoint;
	title: string;
	selected?: true;
	content?: SectionListRenderer;
	trackingParams: string;
};