type D__Tab={
	selected: true;
	content: R_RichGrid;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
}|{
	selected: true;
	content: R_SectionList;
	trackingParams: string;
}|{
	endpoint: E_Browse;
	title: string;
	selected?: true;
	content?: R_SectionList;
	trackingParams: string;
}|{
	endpoint: E_Browse;
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FEsubscriptions";
	accessibility: D__Accessibility;
	trackingParams: string;
};