type ProductListItem={
	title: SimpleText;
	accessibilityTitle: string;
	thumbnail: Thumbnail;
	price: `CA$${string}`;
	onClickCommand: E$UrlEndpoint;
	trackingParams: string;
	loggingDirectives: LoggingDirectives;
};
