type BrowseFeedSectionListData={
	continuations?: NextContinuationData[];
	contents: SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: `browse-feedUC${string}featured`;
};

type SectionListData={
	continuations?: NextContinuationData[];
	contents: SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
}|SearchFeedSectionListData|BrowseFeedSectionListData;
type SearchFeedSectionListData={
	continuations?: NextContinuationData[];
	contents: SectionListItem[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed"|`browse-feedUC${string}featured`;
};