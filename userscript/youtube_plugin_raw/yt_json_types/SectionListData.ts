type D$BrowseFeedSectionList={
	continuations?: A$NextContinuationData[];
	contents: $SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: `browse-feedUC${string}featured`;
};

type D$GenericSectionList={
	continuations?: A$NextContinuationData[];
	contents: $SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
};

type G$SectionList=D$GenericSectionList|D$SearchFeedSectionList|D$BrowseFeedSectionList;
type D$SearchFeedSectionList={
	continuations?: A$NextContinuationData[];
	contents: $SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};