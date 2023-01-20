type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: TextWithRuns;
	image: ThumbnailsList;
	bodyText: TextWithRuns;
	secondaryText: TextWithRuns;
	badge: MetadataBadgeData;
	menu: MenuRenderer;
	ctaButton: R$Button;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: R$Button;
	mediaBadge: MetadataBadgeData;
	trackingParams: string;
}
