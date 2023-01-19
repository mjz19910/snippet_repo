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
	endpoint: BrowseEndpoint;
	title: string;
	selected: true;
	content: SectionListRenderer;
	trackingParams: string;
};