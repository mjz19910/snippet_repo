type VideoDescriptionHeaderData={
	title: TextWithRuns;
	channel: SimpleText;
	views: SimpleText;
	publishDate: SimpleText;
	factoid: FactoidRenderer[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: BrowseEndpoint;
	channelThumbnail: Thumbnail;
};