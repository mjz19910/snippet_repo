type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: TextT;
	image: ThumbnailsList;
	bodyText: TextT;
	secondaryText: TextT;
	badge: MetadataBadgeData;
	menu: MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: ButtonRenderer;
	mediaBadge: MetadataBadgeData;
	trackingParams: string;
}
