type D_ProductListItem={
	title: R_SimpleText;
	accessibilityTitle: string;
	thumbnail: D_Thumbnail;
	price: `CA_${string}`;
	onClickCommand: E_Url;
	trackingParams: string;
	loggingDirectives: A_LoggingDirectives;
};