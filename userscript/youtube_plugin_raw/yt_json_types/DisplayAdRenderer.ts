type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: D$TextWithRuns;
	image: R$ThumbnailsList;
	bodyText: D$TextWithRuns;
	secondaryText: D$TextWithRuns;
	badge: MetadataBadgeData;
	menu: R$Menu;
	ctaButton: R$ButtonRenderer;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: R$ButtonRenderer;
	mediaBadge: MetadataBadgeData;
	trackingParams: string;
}
