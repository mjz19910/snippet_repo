type TabData={
	selected: true;
	content: R$RichGrid;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
}|{
	selected: true;
	content: R$SectionList;
	trackingParams: string;
}|{
	endpoint: E$Browse;
	title: string;
	selected?: true;
	content?: R$SectionList;
	trackingParams: string;
}|{
	endpoint: E$Browse;
	selected: true;
	content: R$SectionList;
	tabIdentifier: "FEsubscriptions";
	accessibility: A$Accessibility;
	trackingParams: string;
};