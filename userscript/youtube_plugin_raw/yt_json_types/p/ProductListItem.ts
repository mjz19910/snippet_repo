type D_ProductListItem={
	title: R_SimpleText;
	accessibilityTitle: string;
	thumbnail: R_Thumbnail;
	price: `CA_${string}`;
	onClickCommand: E_Url;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
};