type D_BrowseFeedSectionList={
	continuations?: RD_NextContinuation[];
	contents: TR_SectionListItem<{},{},{}>[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: `browse-feedUC${string}featured`;
};