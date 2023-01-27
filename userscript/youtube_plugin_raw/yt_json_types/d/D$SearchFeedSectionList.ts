type D_SearchFeedSectionList={
	continuations?: RCD_Next[];
	contents: TR_SectionListItem_3<{},{},{}>[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};