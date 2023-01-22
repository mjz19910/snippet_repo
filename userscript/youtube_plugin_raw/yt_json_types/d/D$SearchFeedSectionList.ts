type D_SearchFeedSectionList={
	continuations?: RD__NextContinuation[];
	contents: $SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};