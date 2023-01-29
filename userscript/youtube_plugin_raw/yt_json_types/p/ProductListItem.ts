type D_ProductListItem={
	title: D_Text;
	accessibilityTitle: string;
	thumbnail: R_Thumbnail;
	price: `CA_${string}`;
	onClickCommand: E_Url;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
};