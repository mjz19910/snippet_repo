type D$ProductListItem={
	title: D$SimpleText;
	accessibilityTitle: string;
	thumbnail: D$Thumbnail;
	price: `CA$${string}`;
	onClickCommand: E$UrlEndpoint;
	trackingParams: string;
	loggingDirectives: A$LoggingDirectives;
};