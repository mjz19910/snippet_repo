type D_Tab={
	endpoint: E_VE3611;
	title: "Home";
	trackingParams: string;
}|{
	selected: true;
	content: R_RichGrid;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
}|{
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FEhistory";
	accessibility: TD_Accessibility<"history">;
	trackingParams: string;
}|{
	selected: true;
	content: R_SectionList;
	trackingParams: string;
}|{
	endpoint: E_VE96368;
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FEsubscriptions";
	accessibility: D_Accessibility;
	trackingParams: string;
}|{
	content: R_MusicQueue;
	trackingParams: string;
};
