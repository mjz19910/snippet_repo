type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: TextT;
	image: ThumbnailsList;
	bodyText: TextT;
	secondaryText: TextT;
	badge: MetadataBadgeRenderer;
	menu: MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: YtEndpoint[];
	clickCommand: {};
	mediaHoverOverlay: ButtonRenderer;
	mediaBadge: MetadataBadgeRenderer;
	trackingParams: string;
}
