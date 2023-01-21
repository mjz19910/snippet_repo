type VideoDescriptionHeaderData={
	title: D$TextWithRuns;
	channel: D$SimpleText;
	views: D$SimpleText;
	publishDate: D$SimpleText;
	factoid: FactoidRenderer[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: E$BrowseEndpoint;
	channelThumbnail: Thumbnail;
};