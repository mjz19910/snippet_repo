type VideoDescriptionHeaderData={
	title: TextWithRuns;
	channel: SimpleText;
	views: SimpleText;
	publishDate: SimpleText;
	factoid: FactoidRenderer[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: E_BrowseEndpoint;
	channelThumbnail: Thumbnail;
};