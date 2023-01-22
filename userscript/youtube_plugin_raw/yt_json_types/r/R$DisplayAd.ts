type R_DisplayAd={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: R_TextWithRuns;
	image: R_ThumbnailsList;
	bodyText: R_TextWithRuns;
	secondaryText: R_TextWithRuns;
	badge: D_MetadataBadge;
	menu: R_Menu;
	ctaButton: R_Button;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: R_Button;
	mediaBadge: D_MetadataBadge;
	trackingParams: string;
}
