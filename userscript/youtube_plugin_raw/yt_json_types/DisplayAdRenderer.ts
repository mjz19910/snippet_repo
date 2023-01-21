type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: D$TextWithRuns;
	image: R$ThumbnailsList;
	bodyText: D$TextWithRuns;
	secondaryText: D$TextWithRuns;
	badge: MetadataBadgeData;
	menu: R$MenuRenderer;
	ctaButton: R$Button;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: R$Button;
	mediaBadge: MetadataBadgeData;
	trackingParams: string;
}
