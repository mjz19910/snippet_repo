type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: TextWithRuns;
	image: ThumbnailsList;
	bodyText: TextWithRuns;
	secondaryText: TextWithRuns;
	badge: MetadataBadgeData;
	menu: MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: ButtonRenderer;
	mediaBadge: MetadataBadgeData;
	trackingParams: string;
}
