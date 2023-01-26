type G_SectionList={
	contents: TR_SectionListItem_3x<{},{},{}>[];
	trackingParams: string;
}|{
	contents: TR_SectionListItem_3x<{},{},{}>[];
	trackingParams: string;
	targetId: "search-feed";
}|{
	contents: TR_SectionListItem_3x<{},{},{}>[];
	trackingParams: string;
	targetId: `browse-feedUC${string}featured`;
};
type G_TT_SectionList={
	continuations: RD_NextContinuation[];
	contents: TR_SectionListItem_3x<{},{},{}>[];
	trackingParams: string;
	subMenu: {};
	hideBottomSeparator: boolean;
	targetId: `browse-feedUC${string}featured`|"search-feed";
}