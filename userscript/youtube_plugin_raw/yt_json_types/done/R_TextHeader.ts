type D_TextHeader={
	title: G_Text;
	style: "TEXT_HEADER_RENDERER_STYLE_BOLD";
};
type R_TextHeader={textHeaderRenderer: D_TextHeader;};
type DC_SectionList_BrowseFeed_History={
	contents: TR_SectionListItem_3_Empty[];
	trackingParams: string;
	header: R_TextHeader|R_TextHeader;
	targetId: "browse-feedFEhistory";
};
