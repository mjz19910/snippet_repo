type D$SearchFeedSectionList={
	continuations?: A$NextContinuationData[];
	contents: $SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};
