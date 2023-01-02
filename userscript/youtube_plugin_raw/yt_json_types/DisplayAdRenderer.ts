type DisplayAdRenderer={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: YtTextType;
	image: ThumbnailRoot;
	bodyText: YtTextType;
	secondaryText: YtTextType;
	badge: MetadataBadgeRenderer;
	menu: MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: YtEndpoint[];
	clickCommand: {};
	mediaHoverOverlay: ButtonRenderer;
	mediaBadge: MetadataBadgeRenderer;
	trackingParams: string;
}
