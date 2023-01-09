type VideoDescriptionHeaderData={
	title: TextT;
	channel: SimpleText;
	views: SimpleText;
	publishDate: SimpleText;
	factoid: FactoidRenderer[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: BrowseEndpoint;
	channelThumbnail: Thumbnail<{}>;
};