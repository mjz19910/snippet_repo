type SearchBox={
	endpoint: YtEndpoint;
	searchButton: ButtonRenderer;
	clearButton: ButtonRenderer;
	placeholderText: TextT;
	trackingParams: string;
};

type SubFeedOption={
	name: TextT;
	isSelected: boolean;
	navigationEndpoint: YtEndpoint;
	trackingParams: string;
};

type SubFeedOptionRenderer={
	subFeedOptionRenderer: SubFeedOption;
};

type SearchBoxRenderer={
	searchBoxRenderer: SearchBox;
	options: SubFeedOptionRenderer[];
	trackingParams: string;
};

type SubFeedSelector={
	title: TextT;
};

type SubFeedSelectorRenderer={
	subFeedSelectorRenderer: SubFeedSelector;
};

type BrowseFeedContent=SearchBoxRenderer|SubFeedSelectorRenderer|ButtonRenderer|CompactLinkRenderer;

type BrowseFeedActions={
	contents: BrowseFeedContent[];
};

type BrowseFeedActionsRenderer={
	browseFeedActionsRenderer: BrowseFeedActions;
};

type SecondaryContents=ProfileColumnRenderer|BrowseFeedActionsRenderer;
