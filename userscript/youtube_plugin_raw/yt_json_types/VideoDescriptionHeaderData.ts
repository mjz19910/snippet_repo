type D$VideoDescriptionHeader={
	title: R$TextWithRuns;
	channel: R$SimpleText;
	views: R$SimpleText;
	publishDate: R$SimpleText;
	factoid: R$Factoid[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: E$Browse;
	channelThumbnail: D$Thumbnail;
};