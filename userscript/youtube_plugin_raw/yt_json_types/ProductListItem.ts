type ProductListItem={
	title: SimpleText;
	accessibilityTitle: string;
	thumbnail: Thumbnail;
	price: `CA$${string}`;
	onClickCommand: UrlEndpoint;
	trackingParams: string;
	loggingDirectives: LoggingDirectives;
};
