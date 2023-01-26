type D_SearchFeedSectionList={
	continuations?: RD_NextContinuation[];
	contents: TR_SectionListItem_3<{},{},{}>[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};