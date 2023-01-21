type VideoDescriptionHeaderData={
	title: D$TextWithRuns;
	channel: D$SimpleText;
	views: D$SimpleText;
	publishDate: D$SimpleText;
	factoid: R$Factoid[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: E$BrowseEndpoint;
	channelThumbnail: D$Thumbnail;
};