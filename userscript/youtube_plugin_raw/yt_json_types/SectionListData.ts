type SectionListData=ContentsArrayTemplate<SectionListItem>&{
	continuations?: NextContinuationData[];
	trackingParams: string;
	subMenu?: {};
	hideBottomSeparator?: boolean;
	targetId?: "search-feed";
};