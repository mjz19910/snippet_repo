type D_SearchFeedSectionList={
	continuations?: CD_Next[];
	contents: TR_SectionListItem_3<{},{},{}>[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};