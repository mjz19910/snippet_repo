type D_ProductListItem={
	title: G_Text;
	accessibilityTitle: string;
	thumbnail: D_Thumbnail;
	price: `CA_${string}`;
	onClickCommand: E_Url;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
};