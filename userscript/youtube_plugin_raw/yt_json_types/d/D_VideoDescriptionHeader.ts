type D_VideoDescriptionHeader={
	title: R_TextRuns;
	channel: R_SimpleText;
	views: R_SimpleText;
	publishDate: R_SimpleText;
	factoid: R_Factoid[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: E_Browse;
	channelThumbnail: R_Thumbnail;
};