type SectionListData=ContentsArrayTemplate<SectionListItem>&{
	continuations?: NextContinuationData[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
}|SearchFeedSectionListData;
type SearchFeedSectionListData=ContentsArrayTemplate<SectionListItem>&{
	continuations?: NextContinuationData[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId: "search-feed";
};