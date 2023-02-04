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

type G_DC_SectionList=
	|DC_SectionListBase
	|DC_SectionList_SearchFeed
	|DC_SectionList_BrowseFeed_ChannelFeatured
	|DC_SectionList_BrowseFeed_Subscriptions
	|DC_SectionList_BrowseFeed_History
	;
;