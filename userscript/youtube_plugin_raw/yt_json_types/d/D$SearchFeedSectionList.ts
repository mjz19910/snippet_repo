type D$SearchFeedSectionList={
	continuations?: RD$NextContinuation[];
	contents: $SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};