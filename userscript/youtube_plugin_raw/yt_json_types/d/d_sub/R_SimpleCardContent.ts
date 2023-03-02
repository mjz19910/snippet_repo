type D_SimpleCardContent={
	image: D_Thumbnail;
	title: G_Text;
	actionButton: R_SimpleCardButton;
	trackingParams: string;
	displayDomain: G_Text;
	showLinkIcon: true;
	callToAction: G_Text;
	command: E_Url;
};
type R_SimpleCardContent={simpleCardContentRenderer: D_SimpleCardContent;};
