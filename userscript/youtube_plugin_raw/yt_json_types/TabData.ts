type TabData={
	selected: true;
	content: RichGridRenderer;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
}|{
	selected: true;
	content: R$SectionList;
	trackingParams: string;
}|{
	endpoint: E$BrowseEndpoint;
	title: string;
	selected?: true;
	content?: R$SectionList;
	trackingParams: string;
}|{
	endpoint: E$BrowseEndpoint;
	selected: true;
	content: R$SectionList;
	tabIdentifier: "FEsubscriptions";
	accessibility: A$Accessibility;
	trackingParams: string;
};