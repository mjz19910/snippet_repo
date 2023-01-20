type ProductListItem={
	title: SimpleText;
	accessibilityTitle: string;
	thumbnail: Thumbnail;
	price: `CA$${string}`;
	onClickCommand: E_UrlEndpoint;
	trackingParams: string;
	loggingDirectives: LoggingDirectives;
};
